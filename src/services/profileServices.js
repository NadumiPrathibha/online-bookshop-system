import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile'; // Replace with your actual API URL

export const getProfileData = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;  // Ensure this matches your expected API response format
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;  // Rethrow error to handle it in the calling component
  }
};
