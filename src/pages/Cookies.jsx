import React from 'react';
import './Cookies.css';

export default function Cookies() {
  return (
    <div className="cookies-page">
      <div className="cookies-container">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="cookies-section">
          <h2>1. What Are Cookies</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.</p>
        </section>

        <section className="cookies-section">
          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Essential cookies: Required for the website to function properly</li>
            <li>Authentication cookies: To keep you signed in</li>
            <li>Preference cookies: To remember your settings and preferences</li>
            <li>Analytics cookies: To understand how visitors use our website</li>
            <li>Marketing cookies: To deliver relevant advertisements</li>
          </ul>
        </section>

        <section className="cookies-section">
          <h2>3. Types of Cookies We Use</h2>
          <h3>3.1 Essential Cookies</h3>
          <p>These cookies are necessary for the website to function and cannot be switched off in our systems.</p>

          <h3>3.2 Performance Cookies</h3>
          <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>

          <h3>3.3 Functional Cookies</h3>
          <p>These cookies enable the website to provide enhanced functionality and personalization.</p>

          <h3>3.4 Targeting Cookies</h3>
          <p>These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
        </section>

        <section className="cookies-section">
          <h2>4. Managing Cookies</h2>
          <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
          <p>To learn more about cookies and how to manage them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.</p>
        </section>

        <section className="cookies-section">
          <h2>5. Third-Party Cookies</h2>
          <p>Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:</p>
          <ul>
            <li>Google Analytics</li>
            <li>Firebase</li>
            <li>Payment processors</li>
          </ul>
        </section>

        <section className="cookies-section">
          <h2>6. Updates to This Policy</h2>
          <p>We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
        </section>

        <section className="cookies-section">
          <h2>7. Contact Us</h2>
          <p>If you have any questions about our Cookie Policy, please contact us at:</p>
          <p>Email: privacy@magnetphotoqr.com</p>
        </section>
      </div>
    </div>
  );
} 