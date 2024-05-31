import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wellness() {
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/wellness`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setWorkouts(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWorkouts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/wellness/add`, { type, duration }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setWorkouts([...workouts, res.data.newWorkout]);
            setRecommendations(res.data.recommendations);
            setType('');
            setDuration('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Wellness</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <button type="submit">Add Workout</button>
            </form>
            <ul>
                {workouts.map(workout => (
                    <li key={workout._id}>{workout.type} - {workout.duration} mins</li>
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

export default Wellness;