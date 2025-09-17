import styles from "./PatternChoiceButtons.module.css";
import { useState } from "react";
import PatternChoiceButton from "../PatternChoiceButton/PatternChoiceButton";

const shapes = ["clear", "squares", "stripes", "circles"] as const;
type ButtonShape = (typeof shapes)[number];

export default function PatternChoiceButtons() {
  const [selectedShape, setSelectedShape] = useState<ButtonShape>("clear");

  return (
    <div className={styles.container}>
      {shapes.map((shape) => (
        <div
          key={shape}
          className={styles.buttonWrapper}
          onClick={() => setSelectedShape(shape)}
        >
          <PatternChoiceButton shape={shape} />
          {selectedShape === shape && (
            <div className={styles.overlay}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="59"
                height="49"
                viewBox="0 0 59 49"
                fill="none"
              >
                <g filter="url(#filter0_f_16_47)">
                  <rect
                    x="6"
                    y="6"
                    width="47"
                    height="37"
                    rx="8"
                    stroke="white"
                    strokeWidth="3"
                  />
                  <circle cx="29" cy="25" r="3" fill="white" />
                </g>
                <rect
                  x="6"
                  y="6"
                  width="47"
                  height="37"
                  rx="8"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="29" cy="25" r="3" fill="white" />
                <defs>
                  <filter
                    id="filter0_f_16_47"
                    x="0.5"
                    y="0.5"
                    width="58"
                    height="48"
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
                      result="effect1_foregroundBlur_16_47"
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
