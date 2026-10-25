import { useTexture } from "@react-three/drei";
import { useRef } from "react";

export default function WallImageAudioSection({
  title,
  imgSrc,
  audioSrc,
  position,
  rotation = [0, 0, 0],
  width = 5.5,
  height = 2.8,
}) {
  // Phòng hờ nếu imgSrc chưa có thì trả về null để không bao giờ gọi useTexture với giá trị rỗng
 

  const texture = useTexture(imgSrc);
  const audioRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    // 1. Phóng to ảnh
    window.dispatchEvent(
      new CustomEvent("open-wall-image", {
        detail: { src: imgSrc, alt: title },
      })
    );

    // 2. Phát audio thuyết minh
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Lỗi phát audio:", err));
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Khung gỗ viền ngoài tranh */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[width + 0.2, height + 0.2, 0.03]} />
        <meshStandardMaterial color="#4a2e18" roughness={0.6} />
      </mesh>

      {/* Mesh hiển thị tranh y hệt WallImage của Khu 1 nhưng tích hợp thêm click phát audio */}
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

      {/* Thẻ audio ngầm */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
      />
    </group>
  );
}