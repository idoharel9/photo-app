import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Add the contact form submission to Firestore
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        timestamp: new Date(),
        status: 'new'
      });

      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setStatus({
        loading: false,
        success: true,
        error: null
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        loading: false,
        success: false,
        error: 'Failed to submit form. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-intro">Have questions? We're here to help! Fill out the form below and we'll get back to you as soon as possible.</p>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              {status.error && (
                <div className="error-message">
                  {status.error}
                </div>
              )}
              
              {status.success && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  disabled={status.loading}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={status.loading}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-section">
              <h3>Email Us</h3>
              <p>support@magnetphotoqr.com</p>
            </div>

            <div className="info-section">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 4:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="info-section">
              <h3>Response Time</h3>
              <p>We typically respond within 24 hours during business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 