import { useCardData } from "../../context/CardDataContext";
import styles from "./CardModel.module.css";
import { CardModelScene } from "./CardModelScene";

export default function CardModel() {
  const { cardData } = useCardData();
  return (
    <div className={styles.cardModel}>
      <CardModelScene />
      <h3>Preview</h3>
      <p>Customize your card</p>
      <p>{cardData.cardName}</p>
      <p>{cardData.cardNumber}</p>
      <p>{cardData.colorChoice}</p>
      <p>{cardData.patternChoice}</p>
    </div>
  );
}
