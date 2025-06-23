import { useState } from "react";

function TransactionForm({onAddTransaction}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('income');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!description.trim() || !amount) {
            alert ('Please fill in both description and amount!');
            return;
        }

        setIsSubmitting(true);

        const newTransaction = {
            description: description.trim(),
            amount: parseFloat(amount),
            category: category,
            date: new Date().toISOString().split('T')[0]
        };

        setTimeout(() => {
            onAddTransaction(newTransaction);
            setDescription('');
            setAmount('');
            setCategory('income');
            setIsSubmitting(false);
        }, 500);
        alert('Transaction added! Check the console.');
    };

    return (
        <div>
            <h3>Add New Transaction</h3>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="category"> Category: </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="income">Income</option>
                    <option value="expenditures">Expenditures</option>
                    <option value="assets">Assets</option>
                    <option value="savings">Savings</option>
                </select>
                </div>

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
                        disabled ={isSubmitting}
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
                        disabled = {isSubmitting}                     
                    />
                </div>

                <button type="submit" 
                        disabled={isSubmitting} 
                        style= {{
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                >
                        {isSubmitting ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;
