function TransactionList({ transactions, onDeleteTransaction }) {
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
        <p>Add your first transaction using the form above!</p>
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
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
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
              <div style={{ color: getCategoryColor(transaction.category) }}>
                {formatCurrency(transaction.amount)}
              </div>

              <button
                onClick={() => handleDelete(transaction)}
                style={{
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
