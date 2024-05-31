import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Marketing() {
    const [name, setName] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [content, setContent] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/marketing`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCampaigns(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCampaigns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/marketing/create`, {
                name,
                targetAudience,
                content,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCampaigns([...campaigns, res.data.newCampaign]);
            setRecommendations(res.data.recommendations);
            setName('');
            setTargetAudience('');
            setContent('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Marketing</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Target Audience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
                <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Create Campaign</button>
            </form>
            <ul>
                {campaigns.map(campaign => (
                    <li key={campaign._id}>{campaign.name} - {campaign.targetAudience}</li>
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

export default Marketing;