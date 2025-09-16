import style from "./PatternChoiceButton.module.css";

type ButtonShape = "clear" | "squares" | "stripes" | "circles";

type PatternChoiceButtonProps = {
  shape?: ButtonShape;
  onClick?: () => void; // Future click function
};

export default function PatternChoiceButton({
  shape = "clear",
  onClick = () => {},
}: PatternChoiceButtonProps) {
  return (
    <button
      className={`${style.button} ${style[shape]}`}
      onClick={onClick}
    ></button>
  );
}
