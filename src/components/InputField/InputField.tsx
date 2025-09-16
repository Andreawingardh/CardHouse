import { useState } from "react";
import styles from "./InputField.module.css";

export const Patterns = {
  name: "\\w{3,25}",
  cardNumber: "\\d{16,16}",
} as const;

type Patterns = (typeof Patterns)[keyof typeof Patterns];

type InputFieldProps = {
  text: string;
  label: string;
  maxLength: number;
  pattern: Patterns;
};

export default function InputField({
  label,
  text,
  pattern,
  maxLength,
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setErrorMessage("");

    // Auto-format card numbers
    if (pattern === Patterns.cardNumber) {
      // Changed from "\\d{16,16}" to Patterns.cardNumber
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 16) {
        setErrorMessage("Card number cannot exceed 16 digits");
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
      if (!isValidInput(value, pattern)) {
        setErrorMessage(getErrorMessage(pattern));
        return;
      }
    }
    setInputValue(value);
  };
    
  const isValidInput = (value: string, pattern: string): boolean => {
    if (value === "") return true;

    switch (pattern) {
      case Patterns.name: // Use Patterns.name instead of string
        return /^[a-zA-Z\s]*$/.test(value);
      case Patterns.cardNumber: // Use Patterns.cardNumber instead of string
        return /^[0-9\-\s]*$/.test(value);
      default:
        return true;
    }
  };

  const getErrorMessage = (pattern: string): string => {
    switch (pattern) {
      case Patterns.name: // Use Patterns.name instead of string
        return "Name can only contain letters and spaces";
      case Patterns.cardNumber: // Use Patterns.cardNumber instead of string
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
        {pattern === Patterns.cardNumber
          ? inputValue.replace(/\s/g, "").length
          : inputValue.length}{" "}
        / {pattern === Patterns.cardNumber ? 16 : maxLength} {text}
      </p>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
