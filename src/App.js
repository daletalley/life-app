import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Finance from './components/Dashboard/Finance';
import Wellness from './components/Dashboard/Wellness';
import Travel from './components/Dashboard/Travel';
import CustomerService from './components/Dashboard/CustomerService';
import Marketing from './components/Dashboard/Marketing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/wellness" element={<Wellness />} />
                    <Route path="/travel" element={<Travel />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;