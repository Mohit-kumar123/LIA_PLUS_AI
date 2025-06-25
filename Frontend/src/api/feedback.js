import axios from 'axios';

// Automatically use the deployed API if available, otherwise use localhost
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lia-plus-ai-1.onrender.com/feedback'
    : 'http://localhost:5000/feedback';

export const submitFeedback = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getFeedback = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};