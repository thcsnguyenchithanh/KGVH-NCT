import React from 'react';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function BookShelf({ onOpenLibrary, ...props }) {
  // Load toàn bộ 16 ảnh từ thư mục "pic room3"
  const bookImagePaths = Array.from(
    { length: 16 }, 
    (_, i) => `${import.meta.env.BASE_URL}pic room3/${i + 1}.png`
  );
  const bookTextures = useTexture(bookImagePaths);

  return (
    <group
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenLibrary) onOpenLibrary();
      }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* 🌟 BIỂN HIỆU 3D CỐ ĐỊNH, SẮC NÉT (Khối hộp 3D nguyên khối, không bị lỗi lẹm hình) */}
      <group position={[0, 2.5, 0.2]}>
        {/* Khung nền biển hiệu 3D dày dặn */}
        <mesh>
          <boxGeometry args={[3.4, 0.85, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Viền vàng nổi bật xung quanh biển */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.32, 0.77]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
        
        {/* Nền trong của biển */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[3.24, 0.69]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Dòng tiêu đề chính */}
        <Text
          position={[0, 0.15, 0.05]}
          fontSize={0.15}
          color="#fef08a"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          📚 THƯ VIỆN SÁCH TRỰC TUYẾN
        </Text>

        {/* Dòng hướng dẫn tương tác */}
        <Text
          position={[0, -0.14, 0.05]}
          fontSize={0.105}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          ✨ Nhấn vào tủ để xem chi tiết sách
        </Text>
      </group>

      {/* 2. Khung kệ gỗ chính */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.6, 4.4, 0.6]} />
        <meshStandardMaterial color="#71472d" roughness={0.6} />
      </mesh>

      {/* Vách ngăn ngang giữa */}
      <mesh position={[0, -0.2, 0.05]}>
        <boxGeometry args={[3.5, 0.08, 0.52]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
      </mesh>
      
      {/* Vách ngăn đứng bên phải */}
      <mesh position={[0.6, 0.9, 0.05]}>
        <boxGeometry args={[0.08, 1.8, 0.52]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
      </mesh>

      {/* 3. TẦNG TRÊN: Trưng bày sách dựng và ảnh tư liệu */}
      <group position={[-1.0, 1.2, 0.33]}>
        <mesh>
          <planeGeometry args={[0.7, 0.95]} />
          <meshBasicMaterial map={bookTextures[1]} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[1.1, 1.2, 0.33]}>
        <mesh>
          <planeGeometry args={[1.0, 1.15]} />
          <meshBasicMaterial map={bookTextures[2]} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 4. TẦNG DƯỚI: Sách xếp chồng và sách đứng */}
      <group position={[1.1, -1.3, 0.3]} rotation={[0, 0, 0.05]}>
        <mesh>
          <boxGeometry args={[0.9, 0.12, 0.6]} />
          <meshStandardMaterial color="#294c60" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.85, 0.55]} />
          <meshBasicMaterial map={bookTextures[3]} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[1.15, -1.1, 0.3]}>
        <mesh>
          <boxGeometry args={[0.85, 0.1, 0.55]} />
          <meshStandardMaterial color="#8b2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshBasicMaterial map={bookTextures[4]} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Dãy sách đứng dựng phía dưới */}
      {[-1.2, -0.85, -0.5, 0.15, 0.55].map((xPos, idx) => {
        const textureIndex = 5 + (idx % 11);
        return (
          <group key={idx} position={[xPos, -1.3, 0.33]}>
            <mesh>
              <boxGeometry args={[0.26, 0.95, 0.35]} />
              <meshStandardMaterial color="#3b4d61" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.181]}>
              <planeGeometry args={[0.25, 0.92]} />
              <meshBasicMaterial map={bookTextures[textureIndex]} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* Chậu cây trang trí */}
      <group position={[-1.1, 0.3, 0.33]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}