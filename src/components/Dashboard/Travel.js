import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Travel() {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activities, setActivities] = useState('');
    const [travelPlans, setTravelPlans] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchTravelPlans() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/travel`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setTravelPlans(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTravelPlans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/travel/add`, {
                destination,
                startDate,
                endDate,
                activities: activities.split(','),
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setTravelPlans([...travelPlans, res.data.newTravelPlan]);
            setRecommendations(res.data.recommendations);
            setDestination('');
            setStartDate('');
            setEndDate('');
            setActivities('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Travel</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="text" placeholder="Activities (comma separated)" value={activities} onChange={(e) => setActivities(e.target.value)} />
                <button type="submit">Add Travel Plan</button>
            </form>
            <ul>
                {travelPlans.map(plan => (
                    <li key={plan._id}>{plan.destination} - {plan.startDate} to {plan.endDate}</li>
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

export default Travel;