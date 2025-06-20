import { useState } from 'react';
import './App.css'
import Header from './shared/Header';
import TransactionForm from './features/TransactionForm';
import TransactionList from './features/TransactionList/TransactionList';
import TransactionSummary from './features/TransactionSummary'; 


function App() {
  const [transactions, setTransactions]= useState([]);

  const handleAddTransaction = (newTransaction) => {
    const transactionWithId = {
      id: Date.now(), //right now a simple id using timestamp
      ...newTransaction
    };

    setTransactions([transactionWithId, ...transactions]);
    console.log('Transaction added to state:', transactionWithId);
    //console.log('All transactions:',[transactionWithId, ...transactions]);
  };

  return (
    <div className="container">
      <Header />
      <main>
        <h2>Welcome to your Finance Tracker!</h2>

        {transactions.length > 0 && (
          <TransactionSummary transactions={transactions} />
        )}

        {/* <p>
          Total Transactions: <strong>{transactions.length}</strong>
        </p> */}

        <TransactionForm onAddTransaction = {handleAddTransaction} />
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default App;
