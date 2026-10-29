import { useTexture } from '@react-three/drei';

export default function TopicMeshCard({ topic, index, onClick }) {
  const texture = useTexture(topic.image);

  const col = index % 3; 
  const row = Math.floor(index / 3); 

  const x = (col - 1) * 1.8;   
  const y = (0.7 - row * 1.3); 

  return (
    <group position={[x, y, 0.01]}>
      {/* Khung viền vàng */}
      <mesh position={[0, 0, -0.001]}>
       <boxGeometry args={[1.68, 1.18, 0.03]} />
        <meshStandardMaterial color="#81b713" roughness={0.5} />
      </mesh>

      {/* Ô ảnh chủ đề */}
      <mesh
      position={[0, 0, 0.02]}
        onClick={(e) => {
          e.stopPropagation();

          // 👉 THÊM LOGIC PHÁT AUDIO TRỰC TIẾP TẠI ĐÂY
          if (topic.audio) {
            const sound = new Audio(topic.audio);
            sound.play().catch((err) => {
              console.log("Không phát được audio:", err);
            });
          }

          // Gọi tiếp hàm xử lý logic bên ngoài (mở modal, set state...)
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