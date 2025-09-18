import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useCardData } from "../../context/CardDataContext";

export function CardModelTemplateScene() {
  const { cardData } = useCardData();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Skapa scen & kamera
    const scene = new THREE.Scene();
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;
    camera.position.set(0, 0.5, 3); // Slightly above center
    camera.lookAt(0, -0.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(containerWidth, containerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Ljus
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Skapa kreditkort
    const cardWidth: number = 3.4;
    const cardHeight: number = 2.1;
    const cardDepth: number = 0.05;
    const geometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
    const patternTexture = createPatternTexture(cardData.patternChoice);
    const cardMaterial = new THREE.MeshStandardMaterial({
      color: cardData.colorChoice,
      map: patternTexture,
    });
    const card = new THREE.Mesh(geometry, cardMaterial);
    scene.add(card);

    // Function to create pattern textures
    function createPatternTexture(pattern: string): THREE.CanvasTexture {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 512;
      patternCanvas.height = 320;
      const patternCtx = patternCanvas.getContext("2d");

      if (!patternCtx) return new THREE.CanvasTexture(patternCanvas);

      // Fill with base color
      patternCtx.fillStyle = `#${cardData.colorChoice
        .toString(16)
        .padStart(6, "0")}`;
      patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

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

      return new THREE.CanvasTexture(patternCanvas);
    }

    // Lägg till kanter för bättre synlighet
    // const edges = new THREE.EdgesGeometry(geometry);
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    // const cardEdges = new THREE.LineSegments(edges, lineMaterial);
    // scene.add(cardEdges);

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
    const numberCanvas: HTMLCanvasElement = document.createElement("canvas");
    numberCanvas.width = 512;
    numberCanvas.height = 128;
    const numberCtx = numberCanvas.getContext("2d");

    if (!numberCtx) {
      console.error("Could not get 2D context from number canvas");
      return;
    }

    // Funktion för att uppdatera kortnamn
    function updateNameText(newText: string): void {
      if (!nameCtx) return;
      nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
      nameCtx.fillStyle = "white";
      nameCtx.font = "32px Arial";
      nameCtx.textAlign = "left";
      nameCtx.fillText(newText, 20, 70);
      nameTexture.needsUpdate = true;
    }

    // Funktion för att uppdatera kortnummer
    function updateNumberText(newText: string): void {
      if (!numberCtx) return;
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

    // Skapa platta "overlays" för texten
    // Kortnamn (högre upp på kortet)
    const namePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(cardWidth * 0.9, cardHeight * 0.25),
      nameMaterial
    );
    namePlane.position.set(0, 0.1, cardDepth / 2 + 0.001);
    card.add(namePlane);

    // Kortnummer (lägre ner på kortet)
    const numberPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(cardWidth * 0.9, cardHeight * 0.25),
      numberMaterial
    );
    numberPlane.position.set(0, -0.4, cardDepth / 2 + 0.001);
    card.add(numberPlane);

    // Starta med standardtext
    updateNameText(cardData.cardName);
    updateNumberText(cardData.cardNumber);

    // Animation
    function animate(): void {
      // card.rotation.y += 0.01;
      // cardEdges.rotation.y += 0.01;
      card.rotation.x = -0.25; // Slight tilt backwards
      card.rotation.y = 0.15; // Very slight side angle
      renderer.render(scene, camera);
      // requestAnimationFrame(animate);
    }
    animate();

    // Cleanup function
    return (): void => {
      if (mountRef.current && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cardData]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "35.6875rem",
        height: "23.1875rem",
        aspectRatio: "177 / 115",
      }}
    />
  );
}
