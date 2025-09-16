import styles from "./InputField.module.css";

type InputFieldProps = {
  text: string;
  label: string;
};

export default function InputField({ label, text }: InputFieldProps) {
  return (
    <div className={styles.inputFieldContainer}>
      <label>{label}</label>
      <input className={styles.inputField} type="text"></input>
      <p>{text}</p>
    </div>
  );
}
