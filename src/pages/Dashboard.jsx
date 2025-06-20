import TransactionSummary from "../features/TransactionSummary";
import TransactionList from "../features/TransactionList/TransactionList";

function Dashboard({ transactions }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Overview of your finances</p>

      {transactions.length > 0 ? (
        <>
          <TransactionSummary transactions={transactions} />
          <div>
            <h3> Recent Transactions</h3>
            <TransactionList transactions={transactions.slice(0, 5)} />
            {transactions.lengt > 5 && (
              <p>Showing your 5 most recent transactions</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3> Welcome to your Finance Tracker!</h3>
          <p>You haven't added any transactions yet.</p>
          <p>click "Add Transaction" above to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
