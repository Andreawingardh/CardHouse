import styles from "./TextContainer.module.css";

//Scaleable prop interface with optional parameters
interface TextProps {
  title?: string;
  paragraphOne: string;
  paragraphTwo: string;
}

export default function TextContainer({
  title,
  paragraphOne,
  paragraphTwo,
}: TextProps) {
  return (
    <div className={styles.textContainer}>
      <h2>{title}</h2>
      <p>{paragraphOne}</p>
      <p>{paragraphTwo}</p>
    </div>
  );
}
