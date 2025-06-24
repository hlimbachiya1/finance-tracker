import { forwardRef } from "react";
import styles from "./TextInputwithLabel.module.css";

const TextInputwithLabel = forwardRef(
  (
    {
      elementId,
      label,
      value,
      onChange,
      type = "text",
      placeholder = "",
      required = false,
      min,
      max,
      step,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={elementId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <input
          type={type}
          id={elementId}
          ref={ref}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={styles.input}
        />
      </div>
    );
  }
);

TextInputwithLabel.displayName = "TextInputwithLabel";

export default TextInputwithLabel;
