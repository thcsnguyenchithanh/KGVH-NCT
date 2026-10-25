import { useTexture } from "@react-three/drei";

export default function CeilingDrum({
  y = 3.89,
  position = [0, 0, 0],
  size = 4,
}) {
  // Sửa lại đường dẫn: bỏ dấu chấm (.) thừa sau BASE_URL
  const texture = useTexture(`${import.meta.env.BASE_URL}images/trongDong.png`);

  return (
    <mesh
      position={[position[0], y, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={texture}
        side={2}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}