import React from 'react';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Magnet Photo QR, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>Magnet Photo QR provides a platform for event photographers to create and manage QR codes for their photos, enabling instant digital delivery to event guests.</p>
        </section>

        <section className="terms-section">
          <h2>3. User Accounts</h2>
          <p>To use certain features of the Service, you must register for an account. You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. User Content</h2>
          <p>You retain all rights to your content. By uploading content to our service, you:</p>
          <ul>
            <li>Grant us a license to store and display your content</li>
            <li>Ensure you have necessary rights to the content</li>
            <li>Agree not to upload illegal or inappropriate content</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Payment Terms</h2>
          <p>Subscription fees are billed in advance on a monthly basis. You agree to:</p>
          <ul>
            <li>Pay all fees in a timely manner</li>
            <li>Provide accurate billing information</li>
            <li>Authorize us to charge your payment method</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Termination</h2>
          <p>We may terminate or suspend your account and access to the Service at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>
        </section>

        <section className="terms-section">
          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Magnet Photo QR shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
        </section>

        <section className="terms-section">
          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.</p>
        </section>

        <section className="terms-section">
          <h2>9. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: legal@magnetphotoqr.com</p>
        </section>
      </div>
    </div>
  );
} 