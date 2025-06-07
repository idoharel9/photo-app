import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './CreateEvent.css';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [finalImages, setFinalImages] = useState([]);
  const [qrValue, setQrValue] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const processSingleImage = async (file) => {
    const fileRef = ref(storage, `uploads/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    setQrValue(url);
    setCurrentFile(file);

    await new Promise((res) => setTimeout(res, 500));

    const canvas = await html2canvas(containerRef.current, {
      useCORS: true,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();

    const combinedRef = ref(storage, `uploads/${auth.currentUser.uid}/combined_${file.name}`);
    await uploadBytes(combinedRef, blob);
    const finalUrl = await getDownloadURL(combinedRef);
    return { name: `combined_${file.name}`, url: finalUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !eventDate) {
      setError('Please fill in all fields');
      return;
    }
    if (files.length === 0) {
      setError('Please select at least one photo');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create event document
      const eventDoc = await addDoc(collection(db, 'events'), {
        name: eventName,
        date: new Date(eventDate),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        photoCount: files.length
      });

      // Process and upload images
      const results = [];
      for (const file of files) {
        setCurrentFile(file);
        setQrValue('');
        await new Promise((res) => setTimeout(res, 500));
        const result = await processSingleImage(file);
        results.push(result);
      }

      setFinalImages(results);
      setFiles([]);
      setCurrentFile(null);
      setUploading(false);

      // Navigate to event page
      navigate(`/event/${eventDoc.id}`);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder('images');

    await Promise.all(
      finalImages.map(async (img) => {
        const blob = await (await fetch(img.url)).blob();
        folder.file(img.name, blob);
      })
    );

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${eventName}_images.zip`);
  };

  return (
    <div className="create-event">
      <h1>Create New Event</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photos">Upload Photos</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          {files.length > 0 && (
            <p className="file-info">{files.length} files selected</p>
          )}
        </div>

        <div className="button-group">
          <button type="submit" disabled={uploading}>
            {uploading ? 'Creating Event...' : 'Create Event'}
          </button>
          {finalImages.length > 0 && (
            <button type="button" onClick={handleDownloadAll}>
              Download All Images
            </button>
          )}
        </div>
      </form>

      {/* Hidden preview container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 400,
          height: 'auto',
          display: 'none',
        }}
      >
        {currentFile && (
          <>
            <img
              src={URL.createObjectURL(currentFile)}
              style={{ width: '100%', height: 'auto' }}
              crossOrigin="anonymous"
              alt="preview"
            />
            {qrValue && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  background: 'white',
                  padding: 2,
                }}
              >
                <QRCodeSVG value={qrValue} size={60} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 