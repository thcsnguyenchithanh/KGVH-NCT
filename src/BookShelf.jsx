import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function BookShelf({ onOpenLibrary, ...props }) {
  // Tự động load toàn bộ 16 ảnh từ thư mục "pic room3"
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
        if (onOpenLibrary) onOpenLibrary(); // Mở modal thư viện sách khi click vào tủ
      }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* 1. Biển tiêu đề phía trên tủ (Dùng ảnh 1.png) */}
      <group position={[0, 2.6, 0.1]}>
        <mesh>
          <planeGeometry args={[2.8, 0.8]} />
          <meshBasicMaterial map={bookTextures[0]} transparent />
        </mesh>
      </group>

      {/* 2. Khung kệ gỗ chính (Thiết kế các ô vuông bất đối xứng) */}
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

      {/* 3. TẦNG TRÊN: Trưng bày sách dựng và khung ảnh tư liệu */}
      {/* Ô trên trái: Sách dựng (Dùng ảnh 2.png) */}
      <group position={[-1.0, 1.2, 0.32]}>
        <mesh>
          <planeGeometry args={[0.6, 0.8]} />
          <meshBasicMaterial map={bookTextures[1]} />
        </mesh>
      </group>

      {/* Ô trên phải: Khung ảnh lịch sử lớn (Dùng ảnh 3.png) */}
      <group position={[1.1, 1.2, 0.32]}>
        <mesh>
          <planeGeometry args={[0.9, 1.0]} />
          <meshBasicMaterial map={bookTextures[2]} />
        </mesh>
      </group>

      {/* 4. TẦNG DƯỚI: Sách xếp chồng và các cuốn sách đứng gáy */}
      {/* Sách xếp nằm chồng góc phải */}
      <group position={[1.1, -1.3, 0.3]} rotation={[0, 0, 0.1]}>
        <mesh>
          <boxGeometry args={[0.9, 0.12, 0.6]} />
          <meshStandardMaterial color="#294c60" roughness={0.5} />
        </mesh>
      </group>
      <group position={[1.15, -1.15, 0.3]}>
        <mesh>
          <boxGeometry args={[0.85, 0.1, 0.55]} />
          <meshStandardMaterial color="#8b2626" roughness={0.5} />
        </mesh>
      </group>

      {/* Dãy sách đứng dựng phía dưới (Tự động gán các ảnh tiếp theo từ kho texture) */}
      {[-1.2, -0.8, -0.4, 0.2, 0.6].map((xPos, idx) => {
        const textureIndex = 3 + (idx % 12); 
        return (
          <group key={idx} position={[xPos, -1.3, 0.32]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.22, 0.9, 0.4]} />
              <meshStandardMaterial color="#3b4d61" roughness={0.4} />
            </mesh>
            {/* Mặt trước dán ảnh bìa sách */}
            <mesh position={[0, 0, 0.202]}>
              <planeGeometry args={[0.2, 0.85]} />
              <meshBasicMaterial map={bookTextures[textureIndex]} />
            </mesh>
          </group>
        );
      })}

      {/* Chậu cây trang trí nhỏ */}
      <group position={[-1.1, 0.3, 0.3]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}