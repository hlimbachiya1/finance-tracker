import styles from "./TransactionSummary.module.css";

function TransactionSummary({ transactions }) {
  //handles list for empty transaction early on
  if (transactions.length === 0) {
    return <div>No transactions to summarize.</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  //each category total calculation
  const totals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const income = totals.income || 0;
  const expenditures = totals.expenditures || 0;
  const assets = totals.assets || 0;
  const savings = totals.savings || 0;
  const netWorth = income + assets - expenditures + savings;

  const summaryCards = [
    { category: "income", label: "Income", color: "#28a745" },
    { category: "expenditures", label: "Expenditures", color: "#dc3545" },
    { category: "assets", label: "Assets", color: "#6f42c1" },
    { category: "savings", label: "Savings", color: "#007bff" },
  ];

  return (
    <div>
      <h3>Financial Summary</h3>

      <div>
        {summaryCards
            .filter(({ category }) => (totals[category] || 0) > 0)
            .map(({ category, label, color }) => (
          <div key={category}>
            <div style = {{color}}>{label}</div>
            <div>{formatCurrency(totals[category] || 0)}</div>
          </div>
        ))}
      </div>

      <div>
        <h4>Net Worth</h4>
        <div>{formatCurrency(netWorth)}</div>
        <div> Income + Assets - Expenditures + Savings</div>
      </div>
    </div>
  );
}

export default TransactionSummary;
