import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

export default function App() {
  const [imageURL, setImageURL] = useState(
    "https://via.placeholder.com/400x300.png?text=תמונה"
  );
  const [finalImage, setFinalImage] = useState(null);
  const containerRef = useRef();

  const generateImageWithQRCode = () => {
    if (!containerRef.current) return;
    html2canvas(containerRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setFinalImage(imgData);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>תמונה עם QR Code מודבק</h2>

      {/* האזור שנצלם */}
      <div
        ref={containerRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <img src={imageURL} alt="uploaded" width={400} />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "white",
            padding: 5,
          }}
        >
          <QRCodeSVG value={imageURL} size={80} />
        </div>
      </div>

      <br />
      <button onClick={generateImageWithQRCode} style={{ marginTop: 20 }}>
        צור תמונה עם ברקוד
      </button>

      {/* התמונה הסופית */}
      {finalImage && (
        <div style={{ marginTop: 20 }}>
          <h3>תמונה סופית עם ברקוד:</h3>
          <img src={finalImage} alt="Final with QR" />
        </div>
      )}
    </div>
  );
}
