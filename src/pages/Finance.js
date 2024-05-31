// client/src/pages/Finance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getRecommendations } from '../services/recommendationService';

function Finance() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const res = await axios.get('/api/finance');
                setExpenses(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchExpenses();
    }, []);

    useEffect(() => {
        async function fetchRecommendations() {
            const userData = { /* Your user data */ };
            const recs = await getRecommendations(userData);
            setRecommendations(recs);
        }

        fetchRecommendations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/finance/add', { description, amount });
            setExpenses([...expenses, res.data]);
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