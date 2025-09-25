import styles from "./ActionButton.module.css";

type ButtonColor = "dark" | "light";
type ButtonType = "button" | "submit" | "reset";

type ActionButtonProps = {
  color?: ButtonColor;
  type?: ButtonType;
  onClick?: () => void;
  children: string;
};

export default function ActionButton({
  color = "light",
  type = "button",
  onClick = () => {},
  children,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.actionButton} ${styles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
