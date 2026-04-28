import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if your backend uses a different port or path

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// (Optional) Get a book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

// (Optional) Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
