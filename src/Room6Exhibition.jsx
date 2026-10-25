import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";

export default function WallImageAudioSection({
  title,
  imgSrc,
  audioSrc,
  position,
  rotation = [0, 0, 0],
  width = 5.5,
  height = 2.8,
}) {
    
  const texture = useTexture(imgSrc);
  const audioRef = useRef(null);

  if (!imgSrc) return null;
  
  const handleClick = (e) => {
    e.stopPropagation();

    // 1. Kích hoạt sự kiện mở ảnh lớn (lightbox toàn màn hình có sẵn của hệ thống)
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
      {/* 1. Khung gỗ bao quanh bức tranh */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* 2. Mặt tranh chính dùng mesh và useTexture y hệt WallImage */}
      <mesh
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={2}
        />
      </mesh>

      {/* 3. Thẻ audio ngầm để phát thuyết minh khi click vào ảnh */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
      />
    </group>
  );
}