import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export default function Floor() {
  // Nếu bạn có ảnh vân gỗ (ví dụ: wood.jpg đặt trong thư mục public/images/), 
  // bạn có thể uncomment (bỏ dấu //) dòng dưới đây để dùng ảnh thật:
  const texture = useTexture(`${import.meta.env.BASE_URL}images/wood.jpg`);
  exture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4); // Lặp lại vân gỗ để không bị vỡ hình

  return (
    <mesh 
      position={[0, 0, 0]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      receiveShadow
    >
      {/* Kích thước [10, 8] khớp hoàn hảo với diện tích trần nhà */}
      <planeGeometry args={[10, 8]} />
      
      {/* Dùng meshStandardMaterial với tông màu nâu gỗ sang trọng, độ nhám vừa phải */}
      <meshStandardMaterial 
        color="#8B5A2B" 
        roughness={0.5} 
        metalness={0.1}
        // map={texture} // Bật dòng này lên nếu dùng ảnh vân gỗ
      />
    </mesh>
  );
}