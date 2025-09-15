import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function CardModelScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // Enable transparency
    });
    renderer.setClearColor(0x000000, 0); // Set clear color with 0 alpha (fully transparent)
    renderer.setSize(containerWidth, containerHeight);
    mountRef.current.appendChild(renderer.domElement);

    let creditCard: THREE.Group | null = null;

    // Improve lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);

    camera.position.set(0, 0, 5);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/assets/model/card/metal_cards_animation_copy.gltf",
      function (gltf) {
        console.log("GLTF loaded successfully:", gltf);

        creditCard = gltf.scene;

        // Check bounding box
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Auto-scale and center the model
        const maxSize = Math.max(size.x, size.y, size.z);
        const targetSize = 5; // Desired size
        const scale = targetSize / maxSize;

        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.sub(center.multiplyScalar(scale));

        scene.add(gltf.scene);
      },
      function (progress) {
        console.log("Loading progress:", progress);
      },
      function (error) {
        console.error("Error loading GLTF:", error);
      }
    );

    function animate() {
      if (creditCard) {
        creditCard.rotation.y += 0.02; // Rotate around Y-axis
      }
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "35.6875rem",
        height: "23.1875rem",
        aspectRatio: 177 / 115,
        border: "solid 1px red",
      }}
    />
  );
}
