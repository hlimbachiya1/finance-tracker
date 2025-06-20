function TransactionList({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
              <div>Date: {transaction.date}</div>
            </div>
            <div>{formatCurrency(transaction.amount)} </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
