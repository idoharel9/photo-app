import React from 'react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '../config/paddle';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="hero">
        <h1>Magnet Photo QR System</h1>
        <p>Transform your event photography with instant digital delivery</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </header>

      <section className="how-it-works">
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

      <section className="pricing">
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
    </div>
  );
} 