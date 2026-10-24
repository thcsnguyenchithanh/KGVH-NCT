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
        <planeGeometry args={[1.65, 1.15]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* Ô ảnh chủ đề */}
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