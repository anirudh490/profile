import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, dt) => {
    if (reduced) return;
    group.current.rotation.y += dt * 0.15;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.4, 4, dt);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, state.pointer.x * 0.5, 4, dt);
  });
  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.4} floatIntensity={0.8} rotationIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial color="#0B0B0D" metalness={0.85} roughness={0.3} flatShading />
        </mesh>
        <mesh scale={1.015}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#C6FF4D" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 45 }} frameloop={reduced ? "demand" : "always"} aria-hidden>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#C6FF4D" />
      <pointLight position={[-4, -2, 2]} intensity={25} color="#F5F5F2" />
      <group position={[2.2, 0.2, 0]}><Core reduced={reduced} /></group>
    </Canvas>
  );
}
