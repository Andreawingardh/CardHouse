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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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
    const cardMaterial = new THREE.MeshStandardMaterial({ color: cardData.colorChoice });
    const card = new THREE.Mesh(geometry, cardMaterial);
    scene.add(card);

    // Lägg till kanter för bättre synlighet
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const cardEdges = new THREE.LineSegments(edges, lineMaterial);
    scene.add(cardEdges);

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
      card.rotation.y += 0.01;
      cardEdges.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
        border: "solid 1px red",
      }}
    />
  );
}