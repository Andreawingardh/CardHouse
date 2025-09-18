import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useCardData } from "../../context/CardDataContext";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

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
        const scale = 3 / maxSize; // Adjust target size as needed
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
        nameCanvas.width = 1024;
        nameCanvas.height = 256;
        const nameCtx = nameCanvas.getContext("2d");

        if (!nameCtx) {
          console.error("Could not get 2D context from name canvas");
          return;
        }

        // Skapa en canvas för kortnummer
        const numberCanvas: HTMLCanvasElement =
          document.createElement("canvas");
        numberCanvas.width = 1024;
        numberCanvas.height = 256;
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

          // Bright red background - can't miss it!
          nameCtx.fillStyle = "red";
          nameCtx.fillRect(0, 0, nameCanvas.width, nameCanvas.height);
          // White text
          nameCtx.fillStyle = "black";
          nameCtx.font = "bold 140px Arial";
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

          numberCtx.fillStyle = "blue";
          numberCtx.fillRect(0, 0, numberCanvas.width, numberCanvas.height);
          numberCtx.fillStyle = "white";
          numberCtx.font = "28px monospace"; // Monospace för bättre nummervisning
          numberCtx.textAlign = "left";
          numberCtx.fillText(newText, 20, 70);
          numberTexture.needsUpdate = true;
        }

        // Skapa texturer från canvas
        const nameTexture = new THREE.CanvasTexture(nameCanvas);
        nameTexture.minFilter = THREE.LinearFilter; // Add this
        nameTexture.magFilter = THREE.LinearFilter;
        const nameMaterial = new THREE.MeshBasicMaterial({
          map: nameTexture,
          transparent: true,
          side: THREE.DoubleSide, // Add this
          depthWrite: false,
          depthTest: true,
        });

        const numberTexture = new THREE.CanvasTexture(numberCanvas);
        const numberMaterial = new THREE.MeshBasicMaterial({
          map: numberTexture,
          transparent: true,
          side: THREE.DoubleSide, // Add this
          depthWrite: false,
          depthTest: true,
        });

        // Skapa platta "overlays" för texten
        // Kortnamn (högre upp på kortet)

        console.log(
          "Card dimensions - width:",
          cardWidth,
          "height:",
          cardHeight,
          "depth:",
          cardDepth
        );
        const namePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(1.5, 0.3),
          nameMaterial
        );
        namePlane.position.set(-0.5, 0.01, 0.3); // Left side, slightly above, toward top
        namePlane.rotation.set(0, 0, 0);
        scene.add(namePlane);

        // Kortnummer (lägre ner på kortet)
        const numberPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 0.4),
          numberMaterial
        );
        numberPlane.position.set(0, 0.05, -0.2); // Center X, slightly above, lower on card
        numberPlane.rotation.set(0, 0, 0);
        scene.add(numberPlane);

        // Starta med standardtext
        updateNameText(cardData.cardName);
        updateNumberText(cardData.cardNumber);

        console.log("Name plane created:", namePlane);
        console.log("Name plane position:", namePlane.position);
        console.log("Number plane created:", numberPlane);
        console.log("Number plane position:", numberPlane.position);
        console.log("Card depth value:", cardDepth);
        console.log("credit card position", creditCard.position);

        console.log("Test plane added to scene");
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
