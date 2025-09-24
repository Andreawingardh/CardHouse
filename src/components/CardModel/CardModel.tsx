import { useState } from "react";
import styles from "./CardModel.module.css";
import { CardModelScene } from "./CardModelScene";

export default function CardModel() {

  const [ errorMessage, setErrorMessage ] = useState<string>('')
  
  return (
    <div className={styles.cardModel}>
      <CardModelScene setErrorMessage={setErrorMessage} />
      <h3>Preview</h3>
      <p>Customize your card</p>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
