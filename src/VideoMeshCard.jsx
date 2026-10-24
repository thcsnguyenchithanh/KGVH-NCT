export default function VideoMeshCard({ onClick }) {
  return (
    <group position={[0, 0, 0.01]}>
      {/* Khung viền gỗ bao quanh màn hình video */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[5.7, 3.3]} />
        <meshBasicMaterial color="#70472e" />
      </mesh>

      {/* Màn hình nền đen / ảnh bìa video */}
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <planeGeometry args={[5.5, 3.1]} />
        <meshBasicMaterial color="#111111" />
      </mesh>

      {/* Nút Play / Chữ hướng dẫn nổi trực tiếp bằng HTML tĩnh không bị trôi */}
      <mesh position={[0, 0, 0.01]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <planeGeometry args={[2.5, 0.8]} />
        <meshBasicMaterial color="#70472e" />
      </mesh>
    </group>
  );
}