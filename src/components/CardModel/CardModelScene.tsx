import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useCardData } from "../../context/CardDataContext";
import styles from "./CardModel.module.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface CardModelSceneProps {
  setErrorMessage: (text: string) => void
}

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

export function CardModelScene({setErrorMessage}: CardModelSceneProps) {
  const { cardData } = useCardData();
  const [updateNameFunction, setUpdateNameFunction] = useState<
    ((text: string) => void) | null
  >(null);
  const [updateNumberFunction, setUpdateNumberFunction] = useState<
    ((text: string) => void) | null
  >(null);
  const [changeCreditCardTextureFunction, setChangeCreditCardTextureFunction] =
    useState<((text: string) => void) | null>(null);
  const [createPatternTextureFunction, setcreatePatternTextureFunction] =
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

              if (material.name === "02___Default") {
                mesh.renderOrder = 750;
              }

              if (material.name === "01_Image") {
                const texturePath = availableTextures[textureKey];
                mesh.renderOrder = 0;

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
                    setErrorMessage(
                      `Failed to load texture: ${textureKey}, 
                      ${(error as Error).message}`
                    );
                  }
                );
              }
            }
          });
        }

        //Pattern change
        const patternTexture = createPatternTexture(cardData.patternChoice);
        const textureMaterial = new THREE.MeshStandardMaterial({
          map: patternTexture,
          transparent: true,
        });

        const texturePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(size.x, size.z),
          textureMaterial
        );

        // Function to create pattern textures as SVG
        function createPatternTexture(pattern: string): THREE.Texture {
          let svgString = "";
          const opacity = 0.4; // Adjust opacity between 0 and 1
          const stroke = `rgba(255,255,255,${opacity})`;
          const fill = `rgba(255,255,255,${opacity})`;

          switch (pattern) {
            case "squares":
              svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 39" width="512" height="320">
          <rect x="35.5" y="5.7" width="11" height="11" transform="rotate(45 35.5 5.7)" stroke="${stroke}" fill="none"/>
          <rect x="10.3" y="18.7" width="6.4" height="6.4" transform="rotate(24.5 10.3 18.7)" stroke="${stroke}" fill="none"/>
          <rect x="20.6" y="29.1" width="4.1" height="4.1" transform="rotate(-20.3 23.6 29.1)" stroke="${stroke}" fill="none"/>
        </svg>
      `;
              break;

            case "stripes":
              svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 39" width="512" height="320">
          <rect x="2" y="13" width="45" height="2" fill="${fill}" />
          <rect x="2" y="18" width="34" height="2" fill="${fill}" />
          <rect x="2" y="23" width="24" height="2" fill="${fill}" />
        </svg>
      `;
              break;

            case "circles":
              svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 39" width="512" height="320">
          <circle cx="7.5" cy="31.5" r="2.5" fill="${fill}" />
          <circle cx="41.5" cy="6.5" r="2.5" fill="${fill}" />
          <circle cx="10" cy="24" r="2" fill="${fill}" />
          <circle cx="33" cy="8" r="2" fill="${fill}" />
          <circle cx="42" cy="14" r="2" fill="${fill}" />
          <circle cx="16.5" cy="26.5" r="1.5" fill="${fill}" />
          <circle cx="36.5" cy="17.5" r="1.5" fill="${fill}" />
        </svg>
      `;
              break;

            default:
              const emptyCanvas = document.createElement("canvas");
              return new THREE.CanvasTexture(emptyCanvas);
          }

          const svgBase64 = `data:image/svg+xml;base64,${btoa(svgString)}`;
          const texture = new THREE.TextureLoader().load(svgBase64);

          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          texture.needsUpdate = true;

          return texture;
        }

        texturePlane.material.depthTest = false;
        texturePlane.material.depthWrite = false;

        texturePlane.position.set(0, 0.2, 0); // Middle of your range
        texturePlane.rotation.x = -Math.PI / 2; // Match the card's rotation
        creditCard.add(texturePlane); // Moves with the card
        texturePlane.renderOrder = 500; // Below text (1000) but above card

        // ---- Text ----
        const nameCanvas: HTMLCanvasElement = document.createElement("canvas");
        nameCanvas.width = 512;
        nameCanvas.height = 128;
        const nameCtx = nameCanvas.getContext("2d");

        if (!nameCtx) {
          setErrorMessage("Could not get 2D context from name canvas");
          return;
        }

        // Skapa en canvas för kortnummer
        const numberCanvas: HTMLCanvasElement =
          document.createElement("canvas");
        numberCanvas.width = 512;
        numberCanvas.height = 128;
        const numberCtx = numberCanvas.getContext("2d");

        if (!numberCtx) {
          setErrorMessage("Could not get 2D context from number canvas");
          return;
        }

        // Funktion för att uppdatera kortnamn
        function updateNameText(newText: string): void {
          if (!nameCtx) {
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
        setcreatePatternTextureFunction(() => createPatternTexture);
      },
      function (progress) {
        console.log("Loading progress:", progress);
      },
      function (error) {
        console.error(`Error loading GLTF:, ${(error as Error).message}`);
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
  }, [cardData.patternChoice]);

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
    if (createPatternTextureFunction) {
      createPatternTextureFunction(cardData.patternChoice);
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
    cardData.patternChoice,
    createPatternTextureFunction,
  ]);

  return <div ref={mountRef} className={styles.cardModelScene} />;
}
