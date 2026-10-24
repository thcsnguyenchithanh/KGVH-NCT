import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";

// Component con xử lý từng tường có ảnh và audio tương tác
export function WallAudioSection({ title, imgSrc, audioSrc, width = 6.8, height = 3.2 }) {
  const [showAudio, setShowAudio] = useState(false);
  const audioRef = useRef(null);

  const handleToggleAudio = (e) => {
    e.stopPropagation();
    const nextState = !showAudio;
    setShowAudio(nextState);

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
      {/* Khung tranh chứa ảnh (Click để bật/tắt và phát audio) */}
      <group 
        position={[0, 0.2, 0.02]} 
        onClick={handleToggleAudio}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        {/* Khung gỗ bao quanh */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width + 0.2, height + 0.2, 0.04]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.6} />
        </mesh>

        {/* Mặt ảnh hiển thị */}
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

      {/* Thanh điều khiển Audio hiển thị bên dưới khi click vào ảnh */}
      {showAudio && (
        <Html
          position={[0, -1.5, 0.05]}
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
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontFamily: "sans-serif" }}>
            <span style={{ fontSize: "13px", fontWeight: "bold", color: "#70472e", textAlign: "center" }}>
              🔊 {title}
            </span>
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

// Component chính Phòng 6
export default function Room6Exhibition({ SPACE_CONTENT }) {
  const content = SPACE_CONTENT?.[6];

  if (!content) return null;

  return (
    <group position={[-22, 0, 5.75]}>
      {/* 1. TƯỜNG GIỮA (Tường đối diện) */}
      <group position={[0, 2, -3.82]} rotation={[0, 0, 0]}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[9, 3.8]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </mesh>
        
        <WallAudioSection
          title="Thuyết minh Tường Giữa - Phòng 6"
          imgSrc={content.bgWall6}
          audioSrc={content.audioBg6}
          width={6.8}
          height={3.0}
        />
      </group>

      {/* 2. TƯỜNG TRÁI */}
      <group position={[-4.82, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[6.5, 3.8]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </mesh>

        <WallAudioSection
          title="Thuyết minh Tường Trái - Phòng 6"
          imgSrc={content.imageTrai6}
          audioSrc={content.audioTrai6}
          width={5.5}
          height={2.8}
        />
      </group>

      {/* 3. TƯỜNG PHẢI */}
      <group position={[4.82, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[6.5, 3.8]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </mesh>

        <WallAudioSection
          title="Thuyết minh Tường Phải - Phòng 6"
          imgSrc={content.imagePhai6}
          audioSrc={content.audioPhai6}
          width={5.5}
          height={2.8}
        />
      </group>
    </group>
  );
}