import { useState } from "react";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      income: "#28a745", // green
      expenditures: "#dc3545", // red
      assets: "#6f42c1", // purple
      savings: "#007bff", // blue
    };
    return colors[category] || "#6c757d"; //gray
  };

  const handleDelete = (transaction) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${transaction.description}"?\n\nThis action cannot be undone.`
    );

    if (confirmDelete) {
      onDeleteTransaction(transaction.id);
    }
  };

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      date: transaction.date,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (transaction) => {
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

    onEditTransaction(updatedTransaction);
    setEditingId(null);
    setEditForm({});
  };

  if (transactions.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "35px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3>No transactions yet</h3>
        <p>Click the "Add New Transaction" button to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h3> your Transactions ({transactions.length})</h3>

      <div style={{ marginTop: "15px" }}>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            style={{
              alignItems: "center",
              display: "flex",
              padding: "20px",
              justifyContent: "space-between",
              backgroundColor:
                editingId === transaction.id ? "#fff3cd" : "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {editingId === transaction.id ? (
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    category:
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    style={{ fontSize: "12px", padding: "8px", width: "100%" }}
                  >
                    <option value="income">Income</option>
                    <option value="expenditures">Expenditures</option>
                    <option value="assets">Assets</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    Description:
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    style={{ fontSize: "14px", padding: "8px", width: "100%" }}
                  />
                </div>

                <div>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Amount ($):
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({ ...editForm, amount: e.target.value })
                      }
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Date:
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      style={{
                        fontSize: "14px",
                        padding: "8px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => saveEdit(transaction)}
                    style={{ cursor: "pointer" }}
                  >
                    Save
                  </button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: "18px",
                        display: "block",
                      }}
                    >
                      {transaction.description}
                    </strong>

                    <div
                      style={{
                        color: "#666",
                        fontSize: "14px",
                        marginTop: "5px",
                      }}
                    >
                      {transaction.category.charAt(0).toUpperCase() +
                        transaction.category.slice(1)}
                      <br />
                      {transaction.date}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      color: getCategoryColor(transaction.category),
                      marginRight: "20px",
                    }}
                  >
                    {formatCurrency(transaction.amount)}
                  </div>

                  <button
                    onClick={() => startEdit(transaction)}
                    style={{
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(transaction)}
                    style={{
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
