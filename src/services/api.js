import axios from 'axios';

// This will use the environment variable REACT_APP_API_URL or fall back to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

export const getRecommendations = async (userPreferences) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/recommend`, userPreferences);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        return [];
    }
};

export const healthCheck = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        return null;
    }
};