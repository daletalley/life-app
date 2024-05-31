import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the AI-Powered Lifestyle Management Platform</p>
            <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </div>
    );
}

export default Home;