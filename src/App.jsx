import { useState } from 'react';
import './App.css'
import TransactionForm from './features/TransactionForm';
import Header from './shared/Header';

function App() {
  const [Transactions, setTransactions]= useState([]);

  const handleAddTransaction = (newTransaction) => {
    const TransactionWithId = {
      id: Date.now(), //right now a simple id using timestamp
      ...newTransaction
    };

    setTransactions([TransactionWithId, ...Transactions]);
    console.log('Transaction added to state:', TransactionWithId);
    console.log('All transactions:',[TransactionWithId, ...Transactions]);
  };

  return (
    <div className="container">
      <Header />
      <main>
        <h2>Welcome to your Finance Tracker!</h2>
        <p>
          Total Transactions: 
            <strong>
            {Transactions.length}
            </strong>
        </p>

        <TransactionForm onAddTransaction = {handleAddTransaction} />
      </main>
    </div>
  );
}

export default App;
