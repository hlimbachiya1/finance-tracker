import TransactionForm from "../features/TransactionForm";
import { useNavigate } from "react-router-dom";
import styles from "./AddTransaction.module.css";


function AddTransaction({ onAddTransaction, isSaving}) {
    const navigate= useNavigate();

    const handleAddTransaction = async (transaction) =>{
        await onAddTransaction(transaction);
    };

     return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2>+ Add New Transaction</h2>
                    <p>Record your income, expenses, assets, or savings</p>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className={styles.backButton}
                >
                    ← Back to Dashboard
                </button>
            </div>
            
            <div>
                <TransactionForm onAddTransaction={handleAddTransaction} isSaving={isSaving} />
            </div>

            <div className={styles.tips}>
                <h4>Tips for better tracking:</h4>
                <ul>
                    <li><strong>Income:</strong> Salary, freelance work, investments, gifts</li>
                    <li><strong>Expenditures:</strong> Daily expenses, bills, shopping, entertainment</li>
                    <li><strong>Assets:</strong> Property purchases, valuable acquisitions</li>
                    <li><strong>Savings:</strong> Money moved to savings accounts, retirement funds</li>
                </ul>
            </div>
        </div>
    );
}

export default AddTransaction;