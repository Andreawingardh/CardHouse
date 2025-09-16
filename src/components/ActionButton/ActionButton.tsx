import styles from "./ActionButton.module.css";

type ButtonColor = "dark" | "light";

type ActionButtonProps = {
  color?: ButtonColor;
  onClick?: () => void; // Future click function
  children: string;
};

export default function ActionButton({
  color = "light",
  onClick = () => {},
  children,
}: ActionButtonProps) {
  return (
    <button
      className={`${styles.actionButton} ${styles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
