import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useCardData } from "../../context/CardDataContext";

export function CardModelScene() {
  const { cardData } = useCardData();
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
    let cardName: THREE.Mesh | null = null;
    let cardNumber: THREE.Mesh | null = null;

    // Improve lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 4);
    scene.add(directionalLight);

    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/assets/model/credit_card_model/credit_card.gltf",
      function (gltf) {
        creditCard = gltf.scene;
        console.log("GLTF loaded successfully:", gltf);
        console.log("Credit card object:", creditCard);
        // Add this to check if the model is actually there
        console.log("Number of children in model:", creditCard.children.length);

        // Get bounding box
        const box = new THREE.Box3().setFromObject(creditCard);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Scale to reasonable size
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 7 / maxSize; // Adjust target size as needed
        creditCard.scale.setScalar(scale);

        // Center the model
        creditCard.position.sub(center.multiplyScalar(scale));

        // Get new dimensions
        const scaledBox = new THREE.Box3().setFromObject(creditCard);
        const scaledSize = scaledBox.getSize(new THREE.Vector3());
        console.log("Scaled width:", scaledSize.x);
        console.log("Scaled height:", scaledSize.y);

        const cardWidth = scaledSize.x;
        const cardHeight = scaledSize.z;
        const cardDepth = scaledSize.y;

        // Fix orientation
        creditCard.rotation.x = Math.PI / 2;

        scene.add(creditCard);

        // ---- Textdel ----
        // Skapa en canvas för kortnamn
        const nameCanvas: HTMLCanvasElement = document.createElement("canvas");
        nameCanvas.width = 512;
        nameCanvas.height = 128;
        const nameCtx = nameCanvas.getContext("2d");

        if (!nameCtx) {
          console.error("Could not get 2D context from name canvas");
          return;
        }

        // Skapa en canvas för kortnummer
        const numberCanvas: HTMLCanvasElement =
          document.createElement("canvas");
        numberCanvas.width = 512;
        numberCanvas.height = 128;
        const numberCtx = numberCanvas.getContext("2d");

        if (!numberCtx) {
          console.error("Could not get 2D context from number canvas");
          return;
        }

        // Funktion för att uppdatera kortnamn
        function updateNameText(newText: string): void {
          if (!nameCtx) {
            console.log("can't find name");
            return;
          }
          // White text
          nameCtx.fillStyle = "white";
          nameCtx.font = "32px Arial";
          nameCtx.textAlign = "center";
          nameCtx.textBaseline = "middle";
          nameCtx.fillText(
            newText,
            nameCanvas.width / 2,
            nameCanvas.height / 2
          );
          nameTexture.needsUpdate = true;
        }

        // Funktion för att uppdatera kortnummer
        function updateNumberText(newText: string): void {
          if (!numberCtx) {
            console.log("can't find number");
            return;
          }

          numberCtx.clearRect(0, 0, numberCanvas.width, numberCanvas.height);

          numberCtx.fillStyle = "white";
          numberCtx.font = "28px monospace"; // Monospace för bättre nummervisning
          numberCtx.textAlign = "left";
          numberCtx.fillText(newText, 20, 70);
          numberTexture.needsUpdate = true;
        }

        // Skapa texturer från canvas
        const nameTexture = new THREE.CanvasTexture(nameCanvas);
        const nameMaterial = new THREE.MeshBasicMaterial({
          map: nameTexture,
          transparent: true,
        });

        const numberTexture = new THREE.CanvasTexture(numberCanvas);
        const numberMaterial = new THREE.MeshBasicMaterial({
          map: numberTexture,
          transparent: true,
        });

        console.log(
          "Card dimensions - width:",
          cardWidth,
          "height:",
          cardHeight,
          "depth:",
          cardDepth
        );
        const namePlane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 12),
          nameMaterial
        );
        namePlane.rotation.x = -Math.PI / 2; // Counter-rotate to face forward
        creditCard.add(namePlane);
        namePlane.renderOrder = 1000;
        namePlane.material.depthTest = false;
        namePlane.material.depthWrite = false;

        namePlane.position.set(-22, 0.4, 15);

        console.log("creditCard children:", creditCard.children);
        console.log("namePlane parent:", namePlane.parent);
        cardName = namePlane;

        const numberPlane = new THREE.Mesh(
     new THREE.PlaneGeometry(50, 12),
          numberMaterial
        );
        numberPlane.rotation.x = -Math.PI / 2; // Counter-rotate to face forward
        creditCard.add(numberPlane);
        numberPlane.renderOrder = 1000;
        numberPlane.material.depthTest = false;
        numberPlane.material.depthWrite = false;

        numberPlane.position.set(-11, 0.4, 7);
        cardNumber = numberPlane;

        // Starta med standardtext
        updateNameText(cardData.cardName);
        updateNumberText(cardData.cardNumber);

        console.log("Name plane created:", namePlane);
        console.log("Name plane position:", namePlane.position);
        console.log("Number plane created:", numberPlane);
        console.log("Number plane position:", numberPlane.position);
        console.log("Card depth value:", cardDepth);
        console.log("credit card position", creditCard.position);
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
        // creditCard.rotation.x += 0.01;
      }
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null); // Stop the animation loop
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Clean up renderer
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
