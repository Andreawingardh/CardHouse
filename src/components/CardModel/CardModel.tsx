import styles from "./CardModel.module.css";
import { CardModelTemplateScene } from "./CardModelTemplateScene";

export default function CardModel() {
  return (
    <div className={styles.cardModel}>
      <CardModelTemplateScene />
      <h3>Preview</h3>
      <p>Customize your card</p>
    </div>
  );
}
