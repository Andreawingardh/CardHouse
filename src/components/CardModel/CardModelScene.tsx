import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useCardData } from "../../context/CardDataContext";
import styles from "./CardModel.module.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const availableTextures = {
  original:
    "assets/model/credit_card_model/Textures/Texture01_image@0.5x@0.5x@0.5x.png",
  paleBlue: "assets/model/credit_card_model//Textures/Texture02_paleBlue.png",
  blue: "assets/model/credit_card_model//Textures/Texture03_Blue.png",
  green: "assets/model/credit_card_model//Textures/Texture04_Green.png",
  orange: "assets/model/credit_card_model//Textures/Texture05_Orange.png",
  red: "assets/model/credit_card_model//Textures/Texture06_Magenta.png",
  metal: "assets/model/credit_card_model//Textures/Texture07_Metal.png",
} as const;

export type TextureKey = keyof typeof availableTextures;

export function CardModelScene() {
  const { cardData } = useCardData();
  const [updateNameFunction, setUpdateNameFunction] = useState<
    ((text: string) => void) | null
  >(null);
  const [updateNumberFunction, setUpdateNumberFunction] = useState<
    ((text: string) => void) | null
  >(null);
  const [changeCreditCardTextureFunction, setChangeCreditCardTextureFunction] =
    useState<((text: string) => void) | null>(null);

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

    const controls = new OrbitControls(camera, renderer.domElement);
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

    controls.update();

    // Create our texture loader instance
    const textureLoader = new THREE.TextureLoader();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/assets/model/credit_card_model/credit_card.gltf",
      function (gltf) {
        creditCard = gltf.scene;

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

        // // Fix orientation
        creditCard.rotation.x = Math.PI / 2;

        scene.add(creditCard);

        //Color change
        function changeCreditCardTexture(
          textureKey: keyof typeof availableTextures
        ) {
          gltf.scene.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              const mesh = child as THREE.Mesh;
              const material = mesh.material as THREE.MeshPhysicalMaterial;

              if (material.name === "01_Image") {
                const texturePath = availableTextures[textureKey];

                textureLoader.load(
                  texturePath,
                  (newTexture) => {
                    // This is where we fix the orientation issues

                    newTexture.flipY = false;
                    newTexture.repeat.set(1, 1);

                    // // Set the texture wrapping mode to allow negative repeat values
                    newTexture.wrapS = THREE.RepeatWrapping;
                    newTexture.wrapT = THREE.RepeatWrapping;

                    // Apply the corrected texture to the material
                    material.map = newTexture;
                    material.needsUpdate = true;
                  },
                  undefined,
                  (error) => {
                    console.error(
                      `Failed to load texture: ${textureKey}`,
                      error
                    );
                  }
                );
              }
            }
          });
        }

        //Pattern change

        const patternTexture = createPatternTexture('circles');
        const textureMaterial = new THREE.MeshStandardMaterial({
          map: patternTexture,
          transparent: true,
        });

        const texturePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(size.x, size.z),
          textureMaterial
        );
        // Function to create pattern textures
        function createPatternTexture(pattern: string): THREE.CanvasTexture {
          const patternCanvas = document.createElement("canvas");
          patternCanvas.width = 512;
          patternCanvas.height = 320;
          const patternCtx = patternCanvas.getContext("2d");


          if (!patternCtx) return new THREE.CanvasTexture(patternCanvas);

          // Fill with base color
          // patternCtx.fillStyle = `#${cardData.colorChoice
          //   .toString(16)
          //   .padStart(6, "0")}`;
          // patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

          if (pattern === "squares") {
            patternCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
            for (let x = 40; x < patternCanvas.width; x += 40) {
              for (let y = 40; y < patternCanvas.height; y += 40) {
                patternCtx.fillRect(x - 10, y - 10, 20, 20);
              }
            }
          } else if (pattern === "circles") {
            patternCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
            for (let x = 35; x < patternCanvas.width; x += 35) {
              for (let y = 35; y < patternCanvas.height; y += 35) {
                patternCtx.beginPath();
                patternCtx.arc(x, y, 12, 0, Math.PI * 2);
                patternCtx.fill();
              }
            }
          } else if (pattern === "lines") {
            patternCtx.strokeStyle = "rgba(0, 0, 0, 0.4)";
            patternCtx.lineWidth = 3;
            for (let y = 25; y < patternCanvas.height; y += 25) {
              patternCtx.beginPath();
              patternCtx.moveTo(0, y);
              patternCtx.lineTo(patternCanvas.width, y);
              patternCtx.stroke();
            }
            for (let x = 25; x < patternCanvas.width; x += 25) {
              patternCtx.beginPath();
              patternCtx.moveTo(x, 0);
              patternCtx.lineTo(x, patternCanvas.height);
              patternCtx.stroke();
            }
          }
          patternCtx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Semi-transparent red
          return new THREE.CanvasTexture(patternCanvas);
        }
        texturePlane.material.depthTest = false;
        texturePlane.material.depthWrite = false;

        texturePlane.position.set(0, 0.2, 0); // Middle of your range
        texturePlane.rotation.x = -Math.PI / 2; // Match the card's rotation
        creditCard.add(texturePlane); // Moves with the card
        texturePlane.renderOrder = 500; // Below text (1000) but above card

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

          nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
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

        // Starta med standardtext
        updateNameText(cardData.cardName);
        setUpdateNameFunction(() => updateNameText);
        updateNumberText(cardData.cardNumber);
        setUpdateNumberFunction(() => updateNumberText);
        setChangeCreditCardTextureFunction(() => changeCreditCardTexture);
        createPatternTexture("circles");
      },
      function (progress) {
        console.log("Loading progress:", progress);
      },
      function (error) {
        console.error("Error loading GLTF:", error);
      }
    );

    function animate() {
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

  useEffect(() => {
    if (updateNameFunction) {
      updateNameFunction(cardData.cardName);
    }
    if (updateNumberFunction) {
      updateNumberFunction(cardData.cardNumber);
    }
    if (changeCreditCardTextureFunction) {
      changeCreditCardTextureFunction(cardData.colorChoice);
    }

    if (cardData.colorChoice) {
      // changeCreditCardTexture(cardData.colorChoice)
    }
  }, [
    cardData.cardName,
    updateNameFunction,
    cardData.cardNumber,
    updateNumberFunction,
    changeCreditCardTextureFunction,
    cardData.colorChoice,
  ]);

  return <div ref={mountRef} className={styles.cardModelScene} />;
}
