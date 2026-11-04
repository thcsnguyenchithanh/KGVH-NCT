import React, { useState } from 'react';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function BookShelf({ onOpenLibrary, ...props }) {
  // State quản lý việc ẩn/hiện bảng hướng dẫn 3D khi người dùng nhấn vào tủ
  const [showBadge, setShowBadge] = useState(true);

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
        setShowBadge(false); // Tự động ẩn bảng thông báo ngay khi click vào tủ
        if (onOpenLibrary) onOpenLibrary();
      }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* 1. Biển tiêu đề phía trên tủ (Dùng ảnh 1.png) */}
      <group position={[0, 2.6, 0.12]}>
        <mesh>
          <planeGeometry args={[3.0, 0.9]} />
          <meshBasicMaterial map={bookTextures[0]} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 🌟 2. BẢNG HƯỚNG DẪN 3D (Dùng Mesh và Text thuần túy, to rõ, tự ẩn khi click) */}
      {showBadge && (
        <group position={[0, 1.8, 0.35]}>
          {/* Tấm nền bảng thông báo 3D */}
          <mesh>
            <planeGeometry args={[3.0, 0.65]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Viền vàng nổi bật xung quanh bảng */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.06, 0.71]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>
          {/* Dòng tiêu đề 3D */}
          <Text
            position={[0, 0.13, 0.02]}
            fontSize={0.14}
            color="#fef08a"
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            📚 THƯ VIỆN SÁCH TRỰC TUYẾN
          </Text>
          {/* Dòng hướng dẫn 3D */}
          <Text
            position={[0, -0.12, 0.02]}
            fontSize={0.095}
            color="#cbd5e1"
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            ✨ Nhấn vào đây để xem chi tiết sách
          </Text>
        </group>
      )}

      {/* 3. Khung kệ gỗ chính */}
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

      {/* 4. TẦNG TRÊN: Sách dựng và ảnh tư liệu */}
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

      {/* 5. TẦNG DƯỚI: Sách xếp chồng và sách đứng */}
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