import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '../config/paddle';
import './Landing.css';

export default function Landing() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      question: "How does the QR code system work?",
      answer: "Each photo is assigned a unique QR code that links directly to the digital version. When guests scan the code, they can instantly download their photos. The system is designed to be simple and user-friendly, requiring no technical knowledge to use."
    },
    {
      question: "What types of events is this suitable for?",
      answer: "Our system is perfect for weddings, corporate events, parties, and any occasion where you want to share photos instantly with guests. It's particularly popular for events where you want to provide a professional touch while making photo sharing easy and immediate."
    },
    {
      question: "Can guests download photos without an account?",
      answer: "Yes! Guests can access and download photos simply by scanning the QR code - no account creation required. This makes it extremely convenient for your guests to get their photos instantly."
    },
    {
      question: "How long are the photos stored?",
      answer: "Photos are stored securely in the cloud for 1 year, giving guests plenty of time to download their memories. You can also extend the storage period if needed."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="landing">
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="logo">Magnet Photo QR</Link>
          <div className="nav-links">
            <Link to="#how-it-works">How it works</Link>
            <Link to="#faq">FAQ</Link>
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

      <section id="faq" className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-more">
          <p>Have more questions?</p>
          <Link to="/faq" className="faq-link">View All FAQs</Link>
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