import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li><Link to="/finance">Finance</Link></li>
                <li><Link to="/wellness">Wellness</Link></li>
                <li><Link to="/travel">Travel</Link></li>
                <li><Link to="/customer-service">Customer Service</Link></li>
                <li><Link to="/marketing">Marketing</Link></li>
            </ul>
        </div>
    );
}

export default Dashboard;