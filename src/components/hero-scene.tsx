"use client";

import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticleKind = "board" | "chip" | "cell" | "trace";

type Particle = {
  kind: ParticleKind;
  from: THREE.Vector3;
  sphere: THREE.Vector3;
  logo: THREE.Vector3;
  seed: number;
  scale: THREE.Vector3;
  color: THREE.Color;
};

const KIND_COUNTS: Record<ParticleKind, number> = {
  board: 620,
  chip: 520,
  cell: 420,
  trace: 760
};

const dummy = new THREE.Object3D();
const tempColor = new THREE.Color();

function rand(seed: number) {
  return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
}

function createLogoPoint(index: number, total: number, seed: number) {
  const t = index / total;
  const stroke = Math.floor(t * 5);
  const local = (t * 5) % 1;
  const jitterX = (rand(seed + 7) - 0.5) * 0.12;
  const jitterY = (rand(seed + 9) - 0.5) * 0.12;

  if (stroke === 0) {
    const a = local * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * 1.75 + jitterX, Math.sin(a) * 1.05 + jitterY, 0);
  }

  if (stroke === 1) {
    const a = local * Math.PI * 1.35 - Math.PI * 0.68;
    return new THREE.Vector3(Math.cos(a) * 1.16 + jitterX, Math.sin(a) * 0.68 + jitterY, 0.35);
  }

  if (stroke === 2) {
    return new THREE.Vector3(-0.9 + local * 1.8 + jitterX, 0.02 + jitterY, -0.35);
  }

  if (stroke === 3) {
    return new THREE.Vector3(0.2 + local * 1.45 + jitterX, 0.02 - local * 0.78 + jitterY, 0.18);
  }

  return new THREE.Vector3(-1.6 + local * 0.6 + jitterX, -0.96 + jitterY, 0.08);
}

function buildParticles() {
  const particles: Particle[] = [];
  const total = Object.values(KIND_COUNTS).reduce((sum, count) => sum + count, 0);
  let cursor = 0;

  (Object.keys(KIND_COUNTS) as ParticleKind[]).forEach((kind, kindIndex) => {
    const count = KIND_COUNTS[kind];

    for (let i = 0; i < count; i += 1) {
      const seed = cursor * 0.173 + kindIndex * 91.7;
      const radius = 4.2 + rand(seed + 1) * 7.5;
      const theta = rand(seed + 2) * Math.PI * 2;
      const phi = Math.acos(rand(seed + 3) * 2 - 1);
      const from = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * radius * 0.72,
        Math.sin(phi) * Math.sin(theta) * radius
      );

      const sphereRadius = 2.12 + (rand(seed + 4) - 0.5) * 0.18;
      const sphere = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * sphereRadius,
        Math.cos(phi) * sphereRadius,
        Math.sin(phi) * Math.sin(theta) * sphereRadius
      );

      const logo = createLogoPoint(cursor, total, seed);
      const baseColor =
        kind === "board"
          ? "#14f195"
          : kind === "chip"
            ? "#7df9ff"
            : kind === "cell"
              ? "#ffffff"
              : "#2f7cff";

      const scale =
        kind === "board"
          ? new THREE.Vector3(0.16, 0.018, 0.1)
          : kind === "chip"
            ? new THREE.Vector3(0.09, 0.03, 0.09)
            : kind === "cell"
              ? new THREE.Vector3(0.055, 0.16, 0.055)
              : new THREE.Vector3(0.24, 0.008, 0.008);

      particles.push({
        kind,
        from,
        sphere,
        logo,
        seed,
        scale,
        color: new THREE.Color(baseColor)
      });
      cursor += 1;
    }
  });

  return particles;
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function morphPosition(particle: Particle, time: number, target: THREE.Vector3) {
  const cycle = (time * 0.055 + particle.seed * 0.01) % 1;
  const hover = new THREE.Vector3(
    Math.sin(time * 0.45 + particle.seed) * 0.15,
    Math.cos(time * 0.33 + particle.seed * 1.4) * 0.1,
    Math.sin(time * 0.38 + particle.seed * 0.7) * 0.13
  );

  if (cycle < 0.36) {
    target.copy(particle.from).add(hover);
    return;
  }

  if (cycle < 0.66) {
    const t = easeInOut((cycle - 0.36) / 0.3);
    target.copy(particle.from).lerp(particle.sphere, t).add(hover.multiplyScalar(0.5));
    return;
  }

  if (cycle < 0.9) {
    const t = easeInOut((cycle - 0.66) / 0.24);
    target.copy(particle.sphere).lerp(particle.logo, t);
    return;
  }

  const t = easeInOut((cycle - 0.9) / 0.1);
  target.copy(particle.logo).lerp(particle.from, t).add(hover.multiplyScalar(0.4));
}

function InstancedElectronics({ particles }: { particles: Particle[] }) {
  const boardRef = useRef<THREE.InstancedMesh>(null);
  const chipRef = useRef<THREE.InstancedMesh>(null);
  const cellRef = useRef<THREE.InstancedMesh>(null);
  const traceRef = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const target = useMemo(() => new THREE.Vector3(), []);
  const { mouse } = useThree();

  const grouped = useMemo(
    () => ({
      board: particles.filter((p) => p.kind === "board"),
      chip: particles.filter((p) => p.kind === "chip"),
      cell: particles.filter((p) => p.kind === "cell"),
      trace: particles.filter((p) => p.kind === "trace")
    }),
    [particles]
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    pointer.current.lerp(mouse, 0.04);

    const apply = (mesh: THREE.InstancedMesh | null, items: Particle[]) => {
      if (!mesh) return;

      items.forEach((particle, i) => {
        morphPosition(particle, time, target);
        target.x += pointer.current.x * (0.42 + rand(particle.seed + 12) * 0.4);
        target.y += pointer.current.y * (0.2 + rand(particle.seed + 13) * 0.26);

        dummy.position.copy(target);
        dummy.rotation.set(
          time * 0.08 + particle.seed,
          time * 0.11 + particle.seed * 0.7,
          time * 0.06 + particle.seed * 1.3
        );
        dummy.scale.copy(particle.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        tempColor.copy(particle.color).lerp(new THREE.Color("#ffffff"), rand(particle.seed + 21) * 0.16);
        mesh.setColorAt(i, tempColor);
      });

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };

    apply(boardRef.current, grouped.board);
    apply(chipRef.current, grouped.chip);
    apply(cellRef.current, grouped.cell);
    apply(traceRef.current, grouped.trace);
  });

  return (
    <group>
      <instancedMesh ref={boardRef} args={[undefined, undefined, grouped.board.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#14f195" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={chipRef} args={[undefined, undefined, grouped.chip.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#7df9ff" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={cellRef} args={[undefined, undefined, grouped.cell.length]}>
        <capsuleGeometry args={[0.42, 1, 5, 10]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={traceRef} args={[undefined, undefined, grouped.trace.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#2f7cff" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function GlobeHalo() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.12;
    groupRef.current.rotation.x = Math.sin(time * 0.16) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.18, 48, 48]} />
        <meshBasicMaterial color="#14f195" transparent opacity={0.11} wireframe toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.012, 8, 160]} />
        <meshBasicMaterial color="#7df9ff" transparent opacity={0.62} toneMapped={false} />
      </mesh>
      <mesh rotation={[1.08, 0.32, 0.18]}>
        <torusGeometry args={[2.26, 0.01, 8, 160]} />
        <meshBasicMaterial color="#14f195" transparent opacity={0.48} toneMapped={false} />
      </mesh>
      <mesh rotation={[0.74, -0.52, 0.62]}>
        <torusGeometry args={[1.74, 0.008, 8, 128]} />
        <meshBasicMaterial color="#2f7cff" transparent opacity={0.48} toneMapped={false} />
      </mesh>
    </group>
  );
}

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    const time = clock.getElapsedTime();
    coreRef.current.rotation.y = time * 0.22;
    coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.24;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.24}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.18, 3]} />
        <meshStandardMaterial
          color="#050505"
          emissive="#14f195"
          emissiveIntensity={0.14}
          roughness={0.18}
          metalness={0.82}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function SceneRig() {
  const particles = useMemo(() => buildParticles(), []);

  useFrame(({ camera, clock, mouse }) => {
    const time = clock.getElapsedTime();
    camera.position.x = Math.sin(time * 0.08) * 0.58 + mouse.x * 0.42;
    camera.position.y = 0.2 + Math.cos(time * 0.07) * 0.2 + mouse.y * 0.24;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.18, 7.4]} fov={46} />
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={9} color="#14f195" />
      <pointLight position={[-4, -1, 3]} intensity={5} color="#7df9ff" />
      <Stars radius={28} depth={12} count={1200} factor={2.6} saturation={0} fade speed={0.4} />
      <EnergyCore />
      <GlobeHalo />
      <InstancedElectronics particles={particles} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" data-visual="hero-webgl">
      <Canvas
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
        performance={{ min: 0.55 }}
      >
        <SceneRig />
      </Canvas>
    </div>
  );
}
