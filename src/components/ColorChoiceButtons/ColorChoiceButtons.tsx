import styles from "./ColorChoiceButtons.module.css";
import ColorChoiceButton from "../ColorChoiceButton/ColorChoiceButton";
import { useCardData } from "../../context/CardDataContext";

const colors = ["paleBlue", "blue", "green", "orange", "red", "metal"] as const;

export default function ColorChoiceButtons() {
  const { cardData, setCardData } = useCardData();

  return (
    <div className={styles.container} role="group" aria-label="Color choices">
      {colors.map((color) => (
        <div
          key={color}
          className={styles.buttonWrapper}
          onClick={() => setCardData({ ...cardData, colorChoice: color })}
        >
          <ColorChoiceButton color={color} />
          {cardData.colorChoice === color && (
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
