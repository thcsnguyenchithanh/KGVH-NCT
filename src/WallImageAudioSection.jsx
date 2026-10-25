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
    window.dispatchEvent(
      new CustomEvent("open-wall-image", {
        detail: { src: imgSrc, alt: title },
      })
    );

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Khung gỗ */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* Dùng HTML thay vì useTexture để an toàn 100% với Fiber Context */}
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
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
        >
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </Html>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </group>
  );
}