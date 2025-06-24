import TransactionSummary from "../features/TransactionSummary";
import TransactionList from "../features/TransactionList/TransactionList";

function Dashboard({ transactions, onDeleteTransaction }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Overview of your finances</p>

      {transactions.length > 0 ? (
        <>
          <TransactionSummary transactions={transactions} />
          <div style={{ marginTop: "30ps" }}>
            <h3> Recent Transactions</h3>
            <TransactionList
              transactions={transactions.slice(0, 10)}
              onDeleteTransaction={onDeleteTransaction}
            />
            {transactions.length > 10 && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  color: "#666",
                }}
              >
                Showing your 10 most recent transactions
              </p>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h3> Welcome to your Finance Tracker!</h3>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>
            You haven't added any transactions yet.
          </p>
          <p>click "Add Transaction" above to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
