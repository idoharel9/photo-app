import React, { useState, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [finalImages, setFinalImages] = useState([]);
  const [qrValue, setQrValue] = useState("");
  const [currentFile, setCurrentFile] = useState(null);

  const containerRef = useRef(null);

  const processSingleImage = async (file) => {
    const fileRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    setQrValue(url);
    setCurrentFile(file);

    await new Promise((res) => setTimeout(res, 500));

    const canvas = await html2canvas(containerRef.current, {
      useCORS: true,
      scale: 2,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    const combinedRef = ref(storage, `uploads/combined_${file.name}`);
    await uploadBytes(combinedRef, blob);
    const finalUrl = await getDownloadURL(combinedRef);
    return { name: `combined_${file.name}`, url: finalUrl };
  };

  const handleUploadAll = async () => {
    if (files.length === 0) return alert("לא נבחרו קבצים");

    setUploading(true);
    setFinalImages([]);

    const results = [];
    for (const file of files) {
      setCurrentFile(file);
      setQrValue("");
      await new Promise((res) => setTimeout(res, 500));
      const result = await processSingleImage(file);
      results.push(result);
    }

    setFinalImages(results);
    setFiles([]);
    setCurrentFile(null);
    setUploading(false);
    alert("התמונות הועלו בהצלחה!");
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder("images");

    await Promise.all(
      finalImages.map(async (img) => {
        const blob = await (await fetch(img.url)).blob();
        folder.file(img.name, blob);
      })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "images_with_qr.zip");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>העלאת תמונות עם קוד QR</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <br />
      <button onClick={handleUploadAll} disabled={uploading || files.length === 0}>
        העלה את כל התמונות עם קוד QR
      </button>
      <button onClick={handleDownloadAll} disabled={finalImages.length === 0}>
        הורד את כל התמונות
      </button>

      {/* תצוגת תמונה עם קוד QR */}
      {currentFile && (
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: 400,
            height: "auto",
            border: "1px solid #ccc",
            marginTop: 20,
          }}
        >
          <img
            src={URL.createObjectURL(currentFile)}
            style={{ width: "100%", height: "auto" }}
            crossOrigin="anonymous"
            alt="preview"
          />
          {qrValue && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "white",
                padding: 2,
              }}
            >
              <QRCodeSVG value={qrValue} size={60} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
