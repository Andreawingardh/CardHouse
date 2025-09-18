import styles from "./TextContainer.module.css";

//Scaleable prop interface with optional parameters
interface TextProps {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
}

export function Text({ title, paragraphOne, paragraphTwo }: TextProps) {
  return (
    <div className={styles.TextContainer}>
      <h2>{title}</h2>
      <p>{paragraphOne}</p>
      <p>{paragraphTwo}</p>
    </div>
  );
}
