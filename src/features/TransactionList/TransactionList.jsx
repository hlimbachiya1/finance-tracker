function TransactionList({ transactions }) {
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

  if (transactions.length === 0) {
    return (
      <div>
        <h3>No transactions yet</h3>
        <p>Add your first transaction using the form above!</p>
      </div>
    );
  }

  return (
    <div>
      <h3> your Transactions ({transactions.length})</h3>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <div>
              <strong>{transaction.description}</strong>
              <div>
                {transaction.category.charAt(0).toUpperCase() +
                  transaction.category.slice(1)}
                <br />
                {transaction.date}
              </div>
            </div>

            <div style={{ color: getCategoryColor(transaction.category) }}>
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
