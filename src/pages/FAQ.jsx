import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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
    },
    {
      question: "What file formats are supported?",
      answer: "We support all major image formats including JPG, PNG, and HEIC. Photos are automatically optimized for web viewing while maintaining high quality for downloads."
    },
    {
      question: "Is there a limit to how many photos I can upload?",
      answer: "The number of photos you can upload depends on your subscription plan. Our basic plan starts with 100 photos, while our premium plans offer unlimited uploads. Check our pricing page for detailed information."
    },
    {
      question: "Can I customize the QR codes?",
      answer: "Yes! You can customize the QR codes with your logo, brand colors, or event-specific designs. This helps maintain your brand identity while providing a professional look."
    },
    {
      question: "How do I print the photos with QR codes?",
      answer: "You can download the photos with embedded QR codes directly from your dashboard. They're ready to print on any standard photo printer or through a professional printing service."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">Find answers to common questions about our QR code photo system.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <p>Still have questions?</p>
          <a href="/contact" className="contact-link">Contact Us</a>
        </div>
      </div>
    </div>
  );
} 