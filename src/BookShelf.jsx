import React, { useState, useEffect } from 'react';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function BookShelf({ onOpenLibrary, ...props }) {
  // State quản lý hiển thị biển hướng dẫn
  const [showBadge, setShowBadge] = useState(true);

  // Tự động hiển thị lại biển hướng dẫn khi người dùng thoát khỏi giao diện xem sách
  useEffect(() => {
    const handleRestoreBadge = () => setShowBadge(true);
    
    window.addEventListener('close-library', handleRestoreBadge);
    window.addEventListener('close-modal', handleRestoreBadge);
    window.addEventListener('back-to-main', handleRestoreBadge);

    return () => {
      window.removeEventListener('close-library', handleRestoreBadge);
      window.removeEventListener('close-modal', handleRestoreBadge);
      window.removeEventListener('back-to-main', handleRestoreBadge);
    };
  }, []);

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
        setShowBadge(false); // Ẩn tạm thời khi click vào tủ để mở sách
        if (onOpenLibrary) onOpenLibrary();
      }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* 🌟 1. BIỂN HƯỚNG DẪN 3D NỔI BẬT (THIẾT KẾ CÓ ĐỘ DÀY THỰC TẾ, KHÔNG CÒN GIẢ) */}
      {showBadge && (
        <group position={[0, 2.4, 0.35]}>
          {/* Khung gỗ/kim loại nổi khối 3D phía sau */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[3.4, 0.85, 0.06]} />
            <meshStandardMaterial color="#5c3d2e" roughness={0.4} />
          </mesh>

          {/* Lớp nền bảng màu xanh đen sang trọng */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3.28, 0.75]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>

          {/* Viền vàng trang trí */}
          <mesh position={[0, 0, 0.015]}>
            <ringGeometry args={[0, 0]} /> {/* Giữ chỗ hoặc tạo khung viền nếu cần */}
          </mesh>

          {/* Dòng tiêu đề chính */}
          <Text
            position={[0, 0.16, 0.03]}
            fontSize={0.15}
            color="#fef08a"
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            📚 THƯ VIỆN SÁCH TRỰC TUYẾN
          </Text>

          {/* Dòng chữ hướng dẫn nhấn vào */}
          <Text
            position={[0, -0.14, 0.03]}
            fontSize={0.105}
            color="#cbd5e1"
            anchorX="center"
            anchorY="middle"
            material-toneMapped={false}
          >
            ✨ Nhấn vào tủ để xem chi tiết sách
          </Text>
        </group>
      )}

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