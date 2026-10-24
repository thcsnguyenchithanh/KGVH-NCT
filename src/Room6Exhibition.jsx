import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Định nghĩa component con xử lý hiển thị ảnh bằng mesh và bật/tắt audio khi click
function WallImageAudioSection({ title, imgSrc, audioSrc, width = 5.5, height = 2.8 }) {
  const [showAudio, setShowAudio] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef(null);

  const texture = useLoader(THREE.TextureLoader, imgSrc);

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

  return (
    <group>
      {/* Khung tranh gỗ và ảnh dùng Mesh */}
      <group 
        position={[0, 0.2, 0.02]} 
        onClick={handleMeshClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[isFullScreen ? width * 1.5 : width + 0.2, isFullScreen ? height * 1.5 : height + 0.2, 0.04]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.6} />
        </mesh>

        <mesh position={[0, 0, 0.025]} scale={isFullScreen ? [1.5, 1.5, 1] : [1, 1, 1]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>

      {/* Hộp thoại Audio Player xuất hiện bên dưới khi click */}
      {showAudio && (
        <Html
          position={[0, -1.8, 0.05]}
          transform
          distanceFactor={1.4}
          occlude
          style={{
            width: "480px",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "2px solid #70472e",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            pointerEvents: "auto",
            zIndex: 9999,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#70472e" }}>
                🔊 {title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAudio(false);
                  setIsFullScreen(false);
                  if (audioRef.current) audioRef.current.pause();
                }}
                style={{ background: "#70472e", color: "#fff", border: "none", borderRadius: "4px", padding: "2px 6px", cursor: "pointer", fontSize: "11px" }}
              >
                ✕ Đóng
              </button>
            </div>
            <audio
              ref={audioRef}
              src={audioSrc}
              controls
              style={{ width: "100%", height: "36px" }}
            />
          </div>
        </Html>
      )}
    </group>
  );
}