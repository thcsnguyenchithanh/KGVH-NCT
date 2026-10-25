import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";

export default function WallImageAudioSection({ title, imgSrc, audioSrc, width = 5.5, height = 2.8 }) {
  const [showAudio, setShowAudio] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef(null);

  const handleMeshClick = (e) => {
    e.stopPropagation();
    const nextState = !showAudio;
    setShowAudio(nextState);
    setIsFullScreen(nextState);

    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch((err) => console.log("Lỗi phát audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowAudio(false);
    setIsFullScreen(false);
    if (audioRef.current) audioRef.current.pause();
  };

  return (
    <group>
      {/* 1. Tranh hiển thị bình thường trên tường 3D */}
      <group 
        position={[0, 0.2, 0.02]} 
        onClick={handleMeshClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        {/* Khung gỗ bao quanh */}
     

        {/* Ảnh trên tường */}
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

      {/* 2. GIAO DIỆN FULL MÀN HÌNH (LIGHTBOX) KHI CLICK VÀO ẢNH */}
      {isFullScreen && (
        <Html fullscreen>
          <div
            onClick={handleClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
              pointerEvents: "auto",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            {/* Khung chứa ảnh phóng to và audio, ngăn sự kiện click lan ra ngoài */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              {/* Nút đóng góc trên */}
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontSize: "18px", fontWeight: "bold", fontFamily: "sans-serif" }}>
                  🔊 {title}
                </span>
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
                  ✕ Đóng (Full Màn Hình)
                </button>
              </div>

              {/* Ảnh phóng to thật nét */}
              <img
                src={imgSrc}
                alt={title}
                style={{
                  maxWidth: "85vw",
                  maxHeight: "65vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  border: "4px solid #70472e",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              />

              {/* Hộp thoại Audio Player bên dưới ảnh */}
              {showAudio && (
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
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}