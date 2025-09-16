import styles from './CardModel.module.css';
import { CardModelScene } from './CardModelScene';

export function CardModel() {
  return (
    <div className={styles.cardModel}>
      <CardModelScene />
      <h3>Preview</h3>
      <p>Customize your card</p>
    </div>
  );
}