import styles from "./TextField.module.css";

export default function TextField() {
  return (
    <div className={styles.textField}>
      <p className={styles.paragraph}>
        <strong>Preview:</strong> Your customization options will appear on the
        card
      </p>
    </div>
  );
}
