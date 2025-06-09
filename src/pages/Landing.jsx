import React from 'react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '../config/paddle';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="logo">Magnet Photo QR</Link>
          <div className="nav-links">
            <Link to="#how-it-works">How it works</Link>
            <Link to="#qa">Q&A</Link>
            <Link to="#pricing">Pricing</Link>
            <Link to="#contact">Contact</Link>
          </div>
        </div>
      </nav>

      <header className="hero">
        <h1>Magnet Photo QR System</h1>
        <p>Transform your event photography with instant digital delivery</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </header>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Photos</h3>
            <p>Upload your event photos to our secure cloud storage</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Generate QR Codes</h3>
            <p>Each photo automatically gets a unique QR code</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Print Magnets</h3>
            <p>Download and print your photos with embedded QR codes</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Share Instantly</h3>
            <p>Guests scan QR codes to instantly access their photos</p>
          </div>
        </div>
      </section>

      <section id="qa" className="qa-section">
        <h2>Frequently Asked Questions</h2>
        <div className="qa-container">
          <div className="qa-item">
            <h3>How does the QR code system work?</h3>
            <p>Each photo is assigned a unique QR code that links directly to the digital version. When guests scan the code, they can instantly download their photos.</p>
          </div>
          <div className="qa-item">
            <h3>What types of events is this suitable for?</h3>
            <p>Our system is perfect for weddings, corporate events, parties, and any occasion where you want to share photos instantly with guests.</p>
          </div>
          <div className="qa-item">
            <h3>Can guests download photos without an account?</h3>
            <p>Yes! Guests can access and download photos simply by scanning the QR code - no account creation required.</p>
          </div>
          <div className="qa-item">
            <h3>How long are the photos stored?</h3>
            <p>Photos are stored securely in the cloud for 1 year, giving guests plenty of time to download their memories.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <h2>Choose Your Plan</h2>
        <div className="plans">
          {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
            <div key={key} className="plan-card">
              <h3>{plan.name}</h3>
              <div className="price">${plan.price}<span>/month</span></div>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to="/signup" className="plan-button">Select Plan</Link>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions? We're here to help!</p>
        <Link to="/contact" className="contact-button">Get in Touch</Link>
      </section>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help Center</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Magnet Photo QR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 