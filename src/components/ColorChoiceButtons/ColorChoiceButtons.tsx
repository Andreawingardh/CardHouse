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
          className={styles.buttonWrapper}
          onClick={() => setSelectedColor(color)}
        >
          <ColorChoiceButton color={color} />
          {selectedColor === color && (
            <div className={styles.overlay}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="58"
                viewBox="0 0 57 58"
                fill="none"
              >
                <g filter="url(#filter0_f_15_27)">
                  <rect
                    x="6"
                    y="6"
                    width="45"
                    height="46"
                    rx="8"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <circle cx="28" cy="29" r="5" fill="white" />
                </g>
                <rect
                  x="6"
                  y="6"
                  width="45"
                  height="46"
                  rx="8"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="28" cy="29" r="5" fill="white" />
                <defs>
                  <filter
                    id="filter0_f_15_27"
                    x="0.5"
                    y="0.5"
                    width="56"
                    height="57"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="2"
                      result="effect1_foregroundBlur_15_27"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
