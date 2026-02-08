import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Generic Mechanical Component (Fallback Model)
 * Used when specific part model is unavailable
 */
const GenericComponent = () => {
    const meshRef = useRef();

    return (
        <group ref={meshRef}>
            {/* Main housing */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 1.5, 1]} />
                <meshStandardMaterial
                    color="#6B6B6B"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Mounting flanges */}
            {[-1.1, 1.1].map((x, i) => (
                <mesh key={i} position={[x, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.3, 0.3, 1.6, 16]} />
                    <meshStandardMaterial
                        color="#4A4A4A"
                        metalness={0.7}
                        roughness={0.4}
                    />
                </mesh>
            ))}

            {/* Bolts */}
            {[
                [-0.8, 0.6, 0.6],
                [0.8, 0.6, 0.6],
                [-0.8, -0.6, 0.6],
                [0.8, -0.6, 0.6],
            ].map((pos, i) => (
                <mesh key={`bolt-${i}`} position={pos} castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
                    <meshStandardMaterial
                        color="#2A2A2A"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
};

/**
 * Rotating Brake Disc Model (Default)
 */
const BrakeDisc = () => {
    const meshRef = useRef();

    return (
        <group ref={meshRef}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.5, 0.15, 64]} />
                <meshStandardMaterial color="#8B8B8B" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
                <meshStandardMaterial color="#4A4A4A" metalness={0.8} roughness={0.3} />
            </mesh>
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 1.0;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <mesh key={i} position={[x, 0, z]} castShadow>
                        <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
                        <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.4} />
                    </mesh>
                );
            })}
            {[...Array(5)].map((_, i) => {
                const angle = (i / 5) * Math.PI * 2;
                const radius = 0.7;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <mesh key={`mount-${i}`} position={[x, 0, z]} castShadow>
                        <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
                        <meshStandardMaterial color="#1A1A1A" metalness={0.6} roughness={0.5} />
                    </mesh>
                );
            })}
        </group>
    );
};

/**
 * Dynamic GLTF Model Loader
 * Loads model from URL with error handling
 */
const DynamicModel = ({ modelUrl }) => {
    const meshRef = useRef();
    const [error, setError] = useState(false);

    // Try to load GLTF model
    try {
        const { scene } = useGLTF(modelUrl);

        useEffect(() => {
            if (scene) {
                // Center and scale the model
                const box = new THREE.Box3().setFromObject(scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;

                scene.position.sub(center);
                scene.scale.setScalar(scale);
            }
        }, [scene]);

        return (
            <group ref={meshRef}>
                <primitive object={scene} />
            </group>
        );
    } catch (err) {
        console.warn('Failed to load GLTF model:', modelUrl, err);
        return <GenericComponent />;
    }
};

/**
 * Model Selector Component
 * Chooses which model to render based on modelUrl
 */
const ModelSelector = ({ modelUrl }) => {
    const [loadError, setLoadError] = useState(false);

    // Debug logging
    console.log('🔍 ModelSelector received modelUrl:', modelUrl);

    // If no modelUrl provided, use brake disc
    if (!modelUrl) {
        console.log('⚠️ No modelUrl provided, using BrakeDisc fallback');
        return <BrakeDisc />;
    }

    // If load error occurred, use generic component
    if (loadError) {
        console.log('❌ Load error occurred, using GenericComponent');
        return <GenericComponent />;
    }

    console.log('✅ Attempting to load model from:', modelUrl);

    // Try to load dynamic model, fallback on error
    return (
        <React.Suspense fallback={<BrakeDisc />}>
            <DynamicModel modelUrl={modelUrl} />
        </React.Suspense>
    );
};

/**
 * 3D Scene Component
 * Dark background with orange spotlight from top-right
 * @param {string} modelUrl - URL to GLTF model file
 */
const Scene = ({ modelUrl }) => {
    console.log('🎬 Scene component received modelUrl:', modelUrl);

    return (
        <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden border border-white/10 relative">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[3, 2, 4]} fov={50} />
                <color attach="background" args={['#0D0D0D']} />
                <fog attach="fog" args={['#0D0D0D', 5, 15]} />

                {/* Orange Spotlight from top-right */}
                <spotLight
                    position={[5, 8, 5]}
                    angle={0.3}
                    penumbra={0.5}
                    intensity={2}
                    color="#FF6B00"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                {/* Fill light */}
                <spotLight
                    position={[-3, 5, -3]}
                    angle={0.4}
                    penumbra={0.7}
                    intensity={0.5}
                    color="#FFFFFF"
                    castShadow
                />

                <ambientLight intensity={0.2} />
                <pointLight position={[0, -2, -5]} intensity={0.3} color="#FF6B00" />

                <Stage
                    environment="city"
                    intensity={0.3}
                    shadows={{
                        type: 'accumulative',
                        bias: -0.001,
                        intensity: 1,
                    }}
                    adjustCamera={false}
                >
                    <ModelSelector modelUrl={modelUrl} />
                </Stage>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={8}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate={true}
                    autoRotateSpeed={1.5}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>

            {/* Controls Hint */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm">
                <p className="uppercase tracking-wide">🖱️ Drag to rotate • Scroll to zoom</p>
            </div>
        </div>
    );
};

export default Scene;
