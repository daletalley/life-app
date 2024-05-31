import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/users/login`, userData);
export const addExpense = (expenseData) => axios.post(`${API_URL}/finance/add`, expenseData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getExpenses = () => axios.get(`${API_URL}/finance`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const addWorkout = (workoutData) => axios.post(`${API_URL}/wellness/add`, workoutData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getWorkouts = () => axios.get(`${API_URL}/wellness`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const addTravelPlan = (travelData) => axios.post(`${API_URL}/travel/add`, travelData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getTravelPlans = () => axios.get(`${API_URL}/travel`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const createTicket = (ticketData) => axios.post(`${API_URL}/customer-service/create`, ticketData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getTickets = () => axios.get(`${API_URL}/customer-service`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const createCampaign = (campaignData) => axios.post(`${API_URL}/marketing/create`, campaignData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getCampaigns = () => axios.get(`${API_URL}/marketing`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});