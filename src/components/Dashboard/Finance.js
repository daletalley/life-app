import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Finance() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/finance`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setExpenses(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/finance/add`, { description, amount }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setExpenses([...expenses, res.data.newExpense]);
            setRecommendations(res.data.recommendations);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Finance</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button type="submit">Add Expense</button>
            </form>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>{expense.description} - ${expense.amount}</li>
                ))}
            </ul>
            <h2>Recommendations</h2>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
}

export default Finance;