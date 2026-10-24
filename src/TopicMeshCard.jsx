import { useTexture } from '@react-three/drei';

function TopicMeshCard({ topic, index, onClick }) {
  const texture = useTexture(topic.image);

  // Tính toán vị trí lưới 3 cột, 2 hàng trên mặt tường
  const col = index % 3; // 0, 1, 2
  const row = Math.floor(index / 3); // 0, 1

  const x = (col - 1) * 1.8;   // Khoảng cách ngang
  const y = (0.7 - row * 1.3); // Khoảng cách dọc

  return (
    <group position={[x, y, 0.01]}>
      {/* Khung viền vàng (nếu muốn làm viền kiểu thẻ bài) */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[1.65, 1.15]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* Ô ảnh chủ đề chính */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick(topic);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <planeGeometry args={[1.6, 1.1]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}