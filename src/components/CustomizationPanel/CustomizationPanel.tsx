import styles from "./CustomizationPanel.module.css";
import ColorChoiceButtons from "../ColorChoiceButtons/ColorChoiceButtons";
import PatternChoiceButtons from "../PatternChoiceButtons/PatternChoiceButtons";
import ActionButton from "../ActionButton/ActionButton";
import InputField from "../InputField/InputField";
import TextField from "../TextField/TextField";
import TextContainer from "../TextContainer/TextContainer";
import { useCardData } from "../../context/CardDataContext";
import type { TextureKey } from "../CardModel/CardModelScene";

export default function CustomizationPanel() {
  const { setCardData } = useCardData();

  const initialValues = {
    colorChoice: "paleBlue" as TextureKey,
    patternChoice: "clear",
    cardName: "",
    cardNumber: "",
    inputFieldErrorMessages: {
      cardName: "",
      cardNumber: "",
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.customizationOptions}>
        <div className={styles.color}>
          <h3 className={styles.header}>Color</h3>
          <ColorChoiceButtons />
        </div>
        <div className={styles.pattern}>
          <h3 className={styles.header}>Pattern</h3>
          <PatternChoiceButtons />
        </div>
        <div className={styles.personalization}>
          <h3 className={styles.header}>Personalization</h3>
          <InputField
            label="Personalization"
            text="characters"
            maxLength={25}
            fieldType="name"
          />
          <InputField
            label="Card Number"
            text="digits"
            maxLength={16}
            fieldType="cardNumber"
          />
          <TextField />
        </div>
      </div>
      <div className={styles.buttons}>
        <ActionButton color={"dark"} onClick={() => setCardData(initialValues)}>
          Reset
        </ActionButton>
        <ActionButton>Apply for card</ActionButton>
      </div>
      <TextContainer
        paragraphOne="Terms and conditions may apply."
        paragraphTwo="Excessive use may cause you to become impoverished. "
      />
    </div>
  );
}
