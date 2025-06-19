import { useState } from "react";

function TransactionForm() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!description.trim() || !amount) {
            alert ('Please fill in both description and amount!');
            return;
        }

        console.log ('New Transaction:', {
            description: description.trim(),
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0]
        });

        setDescription('');
        setAmount('');

        alert('Transaction added! Check the console.');
    };

    return (
        <div>
            <h3>Add New Transaction</h3>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="description">
                        Description:
                    </label>
                    <input 
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What was this for?"
                    />    
                </div>

                <div>
                    <label htmlFor="amount" >
                        Amount ($):
                    </label>
                    <input
                        type="number"
                        id="amount"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"                        
                    />
                </div>

                <button
                    type="submit"
                    >
                        Add Transaction
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;
