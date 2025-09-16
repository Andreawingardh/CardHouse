import style from "./ColorChoiceButton.module.css";

type ButtonColor = "paleBlue" | "blue" | "green" | "orange" | "red" | "metal";

type ColorChoiceButtonProps = {
  color?: ButtonColor;
  onClick?: () => void; // Future click function
};

export default function ColorChoiceButton({
  color = "paleBlue",
  onClick = () => {},
}: ColorChoiceButtonProps) {
  return (
    <button
      className={`${style.button} ${style[color]}`}
      onClick={onClick}
    ></button>
  );
}
