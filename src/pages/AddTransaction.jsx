import TransactionForm from "../features/TransactionForm";

function AddTransaction({ onAddTransaction}) {
    return(
        <div>
            <h2> + Add New Transaction</h2>
            <p>Record your income, expenses, assets, or savings</p>
            <div>
                <TransactionForm onAddTransaction={onAddTransaction} />
            </div>

            <div>
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