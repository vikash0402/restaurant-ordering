"use client";

import React, { useRef } from "react";
import QRCode from "react-qr-code";

function GenerateScanner() {
  const qrRef = useRef<HTMLDivElement>(null);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";
  const value: string = `${baseUrl}/menu`; // Your QR content

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ padding: 20, margin: 20 }} ref={qrRef}>
        <QRCode value={value} size={256} />
      </div>
      <button onClick={downloadQR}>Download QR Code</button>
    </div>
  );
}

export default GenerateScanner;
