import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Submit code for review
export const submitCodeReview = async (file, language) => {
  const formData = new FormData();
  formData.append('codeFile', file);
  formData.append('language', language);

  try {
    const response = await apiClient.post('/review', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all reviews
export const getAllReviews = async () => {
  try {
    const response = await apiClient.get('/reviews');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get specific review
export const getReviewById = async (id) => {
  try {
    const response = await apiClient.get(`/review/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
