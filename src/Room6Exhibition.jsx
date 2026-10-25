import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function WallImageAudioSection({
  title,
  imgSrc,
  audioSrc,
  position,
  rotation = [0, 0, 0],
  width = 5.5,
  height = 2.8,
}) {
  const [texture, setTexture] = useState(null);
  const audioRef = useRef(null);

  // Dùng TextureLoader thuần trong useEffect để an toàn tuyệt đối, không làm sập R3F Context
  useEffect(() => {
    if (!imgSrc) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      imgSrc,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (err) => console.log("Lỗi load texture:", err)
    );
  }, [imgSrc]);

  if (!imgSrc || !texture) return null; // Chưa có ảnh thì không render, tránh crash

  const handleClick = (e) => {
    e.stopPropagation();

    window.dispatchEvent(
      new CustomEvent("open-wall-image", {
        detail: { src: imgSrc, alt: title },
      })
    );

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Lỗi phát audio:", err));
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Khung gỗ */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* Mặt tranh */}
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
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thẻ audio ngầm */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
      />
    </group>
  );
}