import styles from "./ColorChoiceButtons.module.css";
import { useState } from "react";
import ColorChoiceButton from "../ColorChoiceButton/ColorChoiceButton";

const colors = ["paleBlue", "blue", "green", "orange", "red", "metal"] as const;
type ButtonColor = (typeof colors)[number];

export default function ColorChoiceButtons() {
  const [selectedColor, setSelectedColor] = useState<ButtonColor | null>(null);

  return (
    <div className={styles.container}>
      {colors.map((color) => (
        <div
          key={color}
          className={`${styles.buttonWrapper} ${
            selectedColor === color ? styles.selected : ""
          }`}
        >
          <ColorChoiceButton
            color={color}
            onClick={() => setSelectedColor(color)}
          />
        </div>
      ))}
    </div>
  );
}
