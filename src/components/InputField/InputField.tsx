import { useState } from "react";
import styles from "./InputField.module.css";

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
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setErrorMessage("");

    if (!isValidInput(value, fieldType)) {
      setErrorMessage(getErrorMessage(fieldType));
      return;
    }

    // Auto-format card numbers
    if (fieldType === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > maxLength) {
        setErrorMessage(`Card number cannot exceed ${maxLength} digits`);
        return;
      }
      // Format with spaces every 4 digits
      value = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    } else {
      // Regular validation for other fields
      if (value.length > maxLength) {
        setErrorMessage(`Maximum ${maxLength} characters allowed`);
        return;
      }
    }
    setInputValue(value);
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
      <label>{label}</label>
      <input
        name={label}
        className={styles.inputField}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <p>
        {fieldType === "cardNumber"
          ? inputValue.replace(/\s/g, "").length
          : inputValue.length}{" "}
        / {maxLength} {text}
      </p>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
