import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import SelectWithLabel from "../shared/SelectWithLabel";

function TransactionForm({ onAddTransaction, isSaving }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('income');

    const categoryOptions = [
        { value: 'income', label: 'Income' },
        { value: 'expenditures', label: 'Expenditures' },
        { value: 'assets', label: 'Assets' },
        { value: 'savings', label: 'Savings' }
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!description.trim() || !amount) {
            alert('Please fill in both description and amount!');
            return;
        }

        const newTransaction = {
            description: description.trim(),
            amount: parseFloat(amount),
            category: category,
            date: new Date().toISOString().split('T')[0]
        };

        onAddTransaction(newTransaction);
        
        // Clear form after submission
        setDescription('');
        setAmount('');
        setCategory('income');
    };

    return (
        <div>
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
                <SelectWithLabel
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categoryOptions}
                    disabled={isSaving}
                />

                <TextInputWithLabel
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What was this for?"
                    disabled={isSaving}
                />

                <TextInputWithLabel
                    label="Amount ($)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    disabled={isSaving}
                />

                <button type="submit" 
                        disabled={isSaving} 
                        style={{
                            cursor: isSaving ? 'not-allowed' : 'pointer',
                            opacity: isSaving ? 0.5 : 1
                        }}
                >
                        {isSaving ? 'Saving...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;