import styles from "./InputField.module.css";
import { useCardData } from "../../context/CardDataContext";

type InputFieldProps = {
  text: string;
  label: string;
  maxLength: number;
  fieldType: "name" | "cardNumber";
};

export default function InputField({
  label,
  text,
  maxLength,
  fieldType,
}: InputFieldProps) {
  const { cardData, setCardData } = useCardData();
  const errorMessage =
    fieldType === "name"
      ? cardData.inputFieldErrorMessages.cardName
      : cardData.inputFieldErrorMessages.cardNumber;

  const setErrorMessage = (message: string) => {
    setCardData({
      ...cardData,
      inputFieldErrorMessages: {
        ...cardData.inputFieldErrorMessages,
        [fieldType === "name" ? "cardName" : "cardNumber"]: message,
      },
    });
  };

  const value = fieldType === "name" ? cardData.cardName : cardData.cardNumber;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    setErrorMessage("");

    // Validates
    if (!isValidInput(input, fieldType)) {
      setErrorMessage(getErrorMessage(fieldType));
      return;
    }

    if (fieldType === "cardNumber") {
      const digitsOnly = input.replace(/\D/g, "");
      if (digitsOnly.length > maxLength) {
        setErrorMessage(`Card number cannot exceed ${maxLength} digits`);
        return;
      }
      // Add blank spaces every fourth digits
      input = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (input.length > maxLength) {
      setErrorMessage(`Maximum ${maxLength} characters allowed`);
      return;
    }

    // Update context
    setCardData({
      ...cardData,
      [fieldType === "name" ? "cardName" : "cardNumber"]: input,
    });
  };

  const isValidInput = (value: string, fieldType: string): boolean => {
    if (value === "") return true;
    switch (fieldType) {
      case "name":
        return /^[a-zA-ZåäöÅÄÖ\s]*$/.test(value);
      case "cardNumber":
        return /^[0-9\-\s]*$/.test(value);
      default:
        return true;
    }
  };

  const getErrorMessage = (fieldType: string): string => {
    switch (fieldType) {
      case "name":
        return "Name can only contain letters and spaces";
      case "cardNumber":
        return "Card number can only contain numbers, hyphens, and spaces";
      default:
        return "Invalid input";
    }
  };

  return (
    <div className={styles.inputFieldContainer}>
      <label htmlFor={fieldType}>{label}</label>
      <input
        id={fieldType}
        name={label}
        className={styles.inputField}
        type="text"
        value={value}
        onChange={handleInputChange}
        aria-describedby={errorMessage ? `${fieldType}-error` : undefined}
      />
      <p>
        {fieldType === "cardNumber"
          ? value.replace(/\s/g, "").length
          : value.length}{" "}
        / {maxLength} {text}
      </p>
      <div className={styles.errorMessages}>
        {errorMessage && <p id={`${fieldType}-error`}>{errorMessage}</p>}
      </div>
    </div>
  );
}
