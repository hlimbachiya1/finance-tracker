import styles from './SelectWithLabel.module.css';

function SelectWithLabel({ 
  elementId, 
  label, 
  value, 
  onChange, 
  options = [],
  required = false,
  disabled = false 
}) {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor={elementId} className={styles.label}>
        {label}
        {required && 
            <span className={styles.required}>
                *
            </span>}
      </label>

      <select
        id={elementId}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
    </div>
  );
}

export default SelectWithLabel;