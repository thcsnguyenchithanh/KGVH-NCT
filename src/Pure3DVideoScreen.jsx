import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Ví dụ component màn hình video thuần 3D cho bàn phòng 1
export default function Pure3DVideoScreen({ videoSrc }) {
  const videoRef = useRef(null);
  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    // Tạo thẻ video ẩn trong DOM để chạy nguồn video
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true; // Cần mute để autoplay trên trình duyệt
    video.playsInline = true;
    video.play();

    videoRef.current = video;

    // Tạo VideoTexture từ thẻ video
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    setVideoTexture(texture);

    return () => {
      video.pause();
      video.src = '';
    };
  }, [videoSrc]);

  return (
    <group position={[0, 1.05, 0]}>
      {/* Khung viền màn hình 3D (BoxGeometry thay vì border của HTML) */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.4, 0.9, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} />
      </mesh>

      {/* Mặt hiển thị video 3D thuần túy */}
      <mesh>
        <planeGeometry args={[1.3, 0.8]} />
        {videoTexture ? (
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#000000" />
        )}
      </mesh>
    </group>
  );
}