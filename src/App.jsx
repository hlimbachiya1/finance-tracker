import { useState } from 'react';
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom';

import Header from './shared/Header';

import Dashboard from './pages/Dashboard.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import About from './pages/About.jsx';

import TransactionForm from './features/TransactionForm';
import TransactionList from './features/TransactionList/TransactionList';
import TransactionSummary from './features/TransactionSummary'; 


function App() {
  const [transactions, setTransactions]= useState([]);
  const navigate = useNavigate();

  const handleAddTransaction = (newTransaction) => {
    const transactionWithId = {
      id: Date.now(), //right now a simple id using timestamp
      ...newTransaction
    };

    setTransactions([transactionWithId, ...transactions]);
    console.log('Transaction added to state:', transactionWithId);
    //console.log('All transactions:',[transactionWithId, ...transactions]);

    navigate('/'); //navigates back to dashboard after adding transaction
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
    console.log('Transaction deleted:', transactionId);
  };

  return (
    <div className="container">
      <Header />

      <main>
       <Routes> 
        <Route path="/" element={<Dashboard 
                                  transactions={transactions}
                                  onDeleteTransaction={handleDeleteTransaction}/>} />
        <Route path="/add" element={<AddTransaction onAddTransaction={handleAddTransaction} />} />
        <Route path="/about" element={<About />} />
        <Route path ="*" element= {
          <div style={{textAlign:'center', padding:'50px'}}>
          <h2>404 Page not Found</h2>
          <button onClick={()=> navigate('/')}> Go to Dashboard</button>
          </div>
        } />

        </Routes> 
      </main>
    </div>
  );
}

export default App;
