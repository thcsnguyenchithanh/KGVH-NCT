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

  // Hệ số phóng to khi click (Bạn có thể tăng lên 2.0 hoặc 2.2 nếu muốn to hơn nữa)
  const scaleFactor = isFullScreen ? 2.0 : 1.0;

  return (
    <group>
      {/* Khung tranh gỗ và ảnh */}
      <group 
        position={[0, 0.2, 0.02]} 
        onClick={handleMeshClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        {/* Khung gỗ bao quanh */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[(width + 0.2) * scaleFactor, (height + 0.2) * scaleFactor, 0.04]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.6} />
        </mesh>

        {/* Ảnh hiển thị qua Html, tự động scale to thu nhỏ mượt mà */}
        <Html
          position={[0, 0, 0.025]}
          transform
          distanceFactor={isFullScreen ? 1.0 : 1.5} // Thu khoảng cách camera lại gần hơn khi phóng to để tạo cảm giác full màn hình
          occlude
          style={{
            width: `${width * 140 * scaleFactor}px`,
            height: `${height * 140 * scaleFactor}px`,
            overflow: "hidden",
            pointerEvents: "auto",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Html>
      </group>

      {/* Hộp thoại Audio Player xuất hiện bên dưới khi click */}
      {showAudio && (
        <Html
          position={[0, -2.2, 0.05]}
          transform
          distanceFactor={1.3}
          occlude
          style={{
            width: "520px",
            background: "rgba(255, 255, 255, 0.98)",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "2px solid #70472e",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            pointerEvents: "auto",
            zIndex: 9999,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "#70472e" }}>
                🔊 {title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAudio(false);
                  setIsFullScreen(false);
                  if (audioRef.current) audioRef.current.pause();
                }}
                style={{ background: "#70472e", color: "#fff", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "12px" }}
              >
                ✕ Đóng
              </button>
            </div>
            <audio
              ref={audioRef}
              src={audioSrc}
              controls
              style={{ width: "100%", height: "38px" }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}