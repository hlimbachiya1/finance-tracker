import './App.css'
import TransactionForm from './features/TransactionForm';
import Header from './shared/Header';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <h2>Welcome to your Finance Tracker!</h2>
        <TransactionForm />
      </main>
    </div>
  );
}

export default App;
