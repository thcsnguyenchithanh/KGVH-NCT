import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";

export default function WallImageAudioSection({ title, imgSrc, audioSrc, width = 5.5, height = 2.8 }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef(null);

  const handleMeshClick = (e) => {
    e.stopPropagation();
    setIsFullScreen(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Lỗi phát audio:", err));
      }
    }, 100);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsFullScreen(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <>
      {/* 1. Tranh hiển thị trên tường 3D */}
      <group 
        position={[0, 0.2, 0.02]} 
        onClick={handleMeshClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        
        <Html
          position={[0, 0, 0.025]}
          transform
          distanceFactor={1.5}
          occlude
          style={{
            width: `${width * 140}px`,
            height: `${height * 140}px`,
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Html>
      </group>

      {/* 2. Overlay phóng to toàn màn hình */}
      {isFullScreen && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
            pointerEvents: "auto",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              maxWidth: "90vw",
              maxHeight: "95vh",
            }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#fff", fontSize: "18px", fontWeight: "bold", fontFamily: "sans-serif" }}>
                🔊 {title}
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: "#a63a3a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ✕ Đóng
              </button>
            </div>

            <img
              src={imgSrc}
              alt={title}
              style={{
                maxWidth: "85vw",
                maxHeight: "65vh",
                objectFit: "contain",
                borderRadius: "8px",
                border: "4px solid #70472e",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
            />

            <div
              style={{
                width: "450px",
                background: "rgba(255, 255, 255, 0.98)",
                padding: "10px 15px",
                borderRadius: "8px",
                border: "2px solid #70472e",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              }}
            >
              <audio
                ref={audioRef}
                src={audioSrc}
                controls
                autoPlay
                style={{ width: "100%", height: "40px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}