import React, { useRef } from "react";
import { Html } from "@react-three/drei";

export default function WallImageAudioSection({
  title,
  imgSrc,
  audioSrc,
  position,
  rotation = [0, 0, 0],
  width = 5.5,
  height = 2.8,
}) {
  const audioRef = useRef(null);

  if (!imgSrc) return null;

  const handleClick = (e) => {
    e.stopPropagation();

    // 1. Kích hoạt sự kiện mở ảnh lớn (lightbox toàn màn hình của hệ thống)
    window.dispatchEvent(
      new CustomEvent("open-wall-image", {
        detail: { src: imgSrc, alt: title },
      })
    );

    // 2. Tự động phát âm thanh thuyết minh
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Lỗi phát audio:", err));
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Khung gỗ bao quanh bức tranh 3D */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* Hiển thị ảnh bằng HTML img bọc trong không gian 3D (An toàn tuyệt đối, không lỗi useTexture) */}
      <Html
        position={[0, 0, 0]}
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
        <div
          onClick={handleClick}
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onPointerOver={(e) => { e.currentTarget.style.opacity = "0.95"; }}
          onPointerOut={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </Html>

      {/* Thẻ audio ngầm phát thuyết minh */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
      />
    </group>
  );
}