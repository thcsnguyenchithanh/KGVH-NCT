import React from 'react';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function Room8({ data, onOpenVideo }) {
  // Lấy dữ liệu cấu hình của Khu 8
  const { video8, imageTrai8, imagePhai8 } = data;

  // Load đồng loạt texture cho 6 ảnh bên trái và 6 ảnh bên phải
  const traiTextures = useTexture(imageTrai8);
  const phaiTextures = useTexture(imagePhai8);

  return (
    <group>
      {/* ================= TƯỜNG GIỮA: HIỂN THỊ VIDEO / BẢNG VIDEO8 ================= */}
      <group position={[0, 2.5, -10]} onClick={() => onOpenVideo && onOpenVideo(video8)}>
        {/* Khung viền màn hình video */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5.2, 3.2, 0.1]} />
          <meshStandardMaterial color="#3a1700" roughness={0.6} />
        </mesh>
        
        {/* Màn hình hiển thị (Giao diện giả lập hoặc nút bấm mở video) */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[4.8, 2.8]} />
          <meshBasicMaterial color="#111111" />
        </mesh>

        {/* Tiêu đề/Nút hướng dẫn click xem video */}
        <Text
          position={[0, -1.2, 0.08]}
          fontSize={0.22}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
        >
          ▶ Click để xem Video 8
        </Text>
      </group>

      {/* ================= TƯỜNG TRÁI: HIỂN THỊ 6 ẢNH (trai1 -> trai6) ================= */}
      <group position={[-9.8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Nền tường trái */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[16, 5]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </meshড

        {/* Trải đều 6 hình ảnh trên tường trái theo trục X */}
        {imageTrai8.map((_, idx) => {
          // Tính toán vị trí X để rải đều 6 tranh trên tường
          const xPos = -5.75 + idx * 2.3;
          return (
            <group key={`trai-${idx}`} position={[xPos, 0, 0.02]}>
              {/* Khung tranh gỗ */}
              <mesh>
                <boxGeometry args={[1.8, 2.4, 0.06]} />
                <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
              </mesh>
              {/* Mặt tranh hiển thị texture ảnh */}
              <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[1.6, 2.2]} />
                <meshBasicMaterial map={traiTextures[idx]} side={THREE.DoubleSide} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ================= TƯỜNG PHẢI: HIỂN THỊ 6 ẢNH (phai1 -> phai6) ================= */}
      <group position={[9.8, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Nền tường phải */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[16, 5]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </mesh>

        {/* Trải đều 6 hình ảnh trên tường phải theo trục X */}
        {imagePhai8.map((_, idx) => {
          const xPos = -5.75 + idx * 2.3;
          return (
            <group key={`phai-${idx}`} position={[xPos, 0, 0.02]}>
              {/* Khung tranh gỗ */}
              <mesh>
                <boxGeometry args={[1.8, 2.4, 0.06]} />
                <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
              </mesh>
              {/* Mặt tranh hiển thị texture ảnh */}
              <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[1.6, 2.2]} />
                <meshBasicMaterial map={phaiTextures[idx]} side={THREE.DoubleSide} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}