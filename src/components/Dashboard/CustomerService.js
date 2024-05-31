import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerService() {
    const [issue, setIssue] = useState('');
    const [tickets, setTickets] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchTickets() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/customer-service`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setTickets(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTickets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/customer-service/create`, { issue }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTickets([...tickets, res.data.newTicket]);
            setRecommendations(res.data.recommendations);
            setIssue('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Customer Service</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
                <button type="submit">Create Ticket</button>
            </form>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket._id}>{ticket.issue} - {ticket.status}</li>
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

export default CustomerService;