import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./shared/Header";

import Dashboard from "./pages/Dashboard.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import About from "./pages/About.jsx";

function App() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`;

  //first use effect
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);

      if (!import.meta.env.VITE_AIRTABLE_BASE_ID || !import.meta.env.VITE_AIRTABLE_TOKEN) {
        console.error('Missing Airtable credentials. Please check your .env.local file.');
        setIsLoading(false);
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const sortQuery = 'sort[0][field]=Created&sort[0][direction]=desc';
        const response = await fetch(`${url}?${sortQuery}`, options);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', response.status, errorText);
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();

        const fetchedTransactions = data.records.map((record) => ({
          id: record.id,
          description: record.fields.Description,
          amount: record.fields.Amount,
          category: record.fields.Category ? record.fields.Category.toLowerCase() : 'income',
          date: record.fields.Date,
        }));

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [url, token]);

  // Second useEffect: Update document title with transaction count
  useEffect(() => {
    if (!isLoading) {
      const transactionCount = transactions.length;
      document.title = transactionCount > 0 
        ? `Finance Tracker (${transactionCount})` 
        : 'Finance Tracker';
    }
  }, [transactions.length, isLoading]);

  const handleAddTransaction = async (newTransaction) => {
    setIsSaving(true);

    // Convert category to proper case for Airtable
    const categoryMap = {
      'income': 'Income',
      'expenditures': 'Expenditures',
      'assets': 'Assets',
      'savings': 'Savings'
    };

    const payload = {
      records: [
        {
          fields: {
            Description: newTransaction.description,
            Amount: newTransaction.amount,
            Category: categoryMap[newTransaction.category] || 'Income',
            Date: newTransaction.date,
          }, 
        },
      ],
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      const responseText = await response.text();

      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response text:', responseText);
        throw new Error(`Failed to save transaction: ${responseText}`);
      }

      const responseData = JSON.parse(responseText);
      const { records } = responseData;

      const savedTransaction = {
        id: records[0].id,
        description: records[0].fields.Description,
        amount: records[0].fields.Amount,
        category: records[0].fields.Category ? records[0].fields.Category.toLowerCase() : 'income',
        date: records[0].fields.Date,
      };

      setTransactions(prev => [savedTransaction, ...prev]);
      navigate("/");
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert(`Failed to save transaction: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTransaction = useCallback(async (transactionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await fetch(`${url}/${transactionId}`, options);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error:', response.status, errorText);
        throw new Error('Failed to delete transaction');
      }

      setTransactions(prev =>
        prev.filter((transaction) => transaction.id !== transactionId)
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction. Please try again.');
    }
  }, [url, token]);

  const handleEditTransaction = async (updatedTransaction) => {
    // Convert category to proper case for Airtable
    const categoryMap = {
      'income': 'Income',
      'expenditures': 'Expenditures',
      'assets': 'Assets',
      'savings': 'Savings'
    };

    const payload = {
      records: [
        {
          id: updatedTransaction.id,
          fields: {
            Description: updatedTransaction.description,
            Amount: updatedTransaction.amount,
            Category: categoryMap[updatedTransaction.category] || 'Income',
            Date: updatedTransaction.date,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update error:', response.status, errorText);
        throw new Error('Failed to update transaction');
      }

      setTransactions(prev =>
        prev.map(transaction =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        )
      );
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Header />
        <main>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Loading your transactions...</h2>
            <p>Please wait while we fetch your data.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={handleEditTransaction}
              />
            }
          />
          <Route
            path="/add"
            element={<AddTransaction onAddTransaction={handleAddTransaction} isSaving={isSaving} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>404 Page not Found</h2>
                <button onClick={() => navigate("/")}> Go to Dashboard</button>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;