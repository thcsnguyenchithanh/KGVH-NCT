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

    // 1. Phóng to ảnh toàn màn hình
    window.dispatchEvent(
      new CustomEvent("open-wall-image", {
        detail: { src: imgSrc, alt: title },
      })
    );

    // 2. Phát audio thuyết minh
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Khung gỗ bao quanh */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* Hiển thị ảnh bằng HTML trực tiếp trong không gian 3D - Không bao giờ sập Fiber Context */}
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
        >
          <img
            src={imgSrc}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </Html>

      {/* Thẻ audio ngầm */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </group>
  );
}