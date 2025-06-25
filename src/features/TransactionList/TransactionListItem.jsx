import { useState, useCallback, useEffect } from "react";
import styles from "./TransactionListItem.module.css";

function TransactionListItem({ transaction, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    description: transaction.description,
    amount: transaction.amount.toString(),
    category: transaction.category,
    date: transaction.date,
  });

  // Reset form when transaction changes
  useEffect(() => {
    setEditForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      date: transaction.date,
    });
  }, [transaction]);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  const getCategoryClass = useCallback((category) => {
    const categoryClasses = {
      income: styles.categoryIncome,
      expenditures: styles.categoryExpenditures,
      assets: styles.categoryAssets,
      savings: styles.categorySavings,
    };
    return categoryClasses[category] || styles.categoryDefault;
  }, []);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      date: transaction.date,
    });
  };

  const handleSaveEdit = () => {
    if (!editForm.description.trim() || !editForm.amount) {
      alert("Please fill in both description and amount!");
      return;
    }

    const updatedTransaction = {
      ...transaction,
      description: editForm.description.trim(),
      amount: parseFloat(editForm.amount),
      category: editForm.category,
      date: editForm.date,
    };

    onEdit(updatedTransaction);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(transaction);
  };

  // Conditional rendering during edit state
  if (isEditing) {
    return (
      <div className={`${styles.transactionItem} ${styles.editing}`}>
        <div className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor={`category-${transaction.id}`}>Category:</label>
            <select
              id={`category-${transaction.id}`}
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
              className={styles.select}
            >
              <option value="income">Income</option>
              <option value="expenditures">Expenditures</option>
              <option value="assets">Assets</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor={`description-${transaction.id}`}>Description:</label>
            <input
              type="text"
              id={`description-${transaction.id}`}
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor={`amount-${transaction.id}`}>Amount ($):</label>
              <input
                type="number"
                id={`amount-${transaction.id}`}
                step="0.01"
                min="0"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: e.target.value })
                }
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`date-${transaction.id}`}>Date:</label>
              <input
                type="date"
                id={`date-${transaction.id}`}
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.editActions}>
            <button onClick={handleSaveEdit} className={styles.saveButton}>
              Save
            </button>
            <button onClick={handleCancelEdit} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.transactionItem}>
      <div className={styles.transactionContent}>
        <div className={styles.transactionDetails}>
          <strong className={styles.description}>{transaction.description}</strong>
          <div className={styles.metadata}>
            <span className={`${styles.category} ${getCategoryClass(transaction.category)}`}>
              {transaction.category.charAt(0).toUpperCase() +
                transaction.category.slice(1)}
            </span>
            <span className={styles.date}>{transaction.date}</span>
          </div>
        </div>

        <div className={styles.transactionActions}>
          <span className={`${styles.amount} ${getCategoryClass(transaction.category)}`}>
            {formatCurrency(transaction.amount)}
          </span>
          <button onClick={handleStartEdit} className={styles.editButton}>
            Edit
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionListItem;