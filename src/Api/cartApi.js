// src/api/cartApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/cart';

export const getCart = (userId) => axios.get(`${API_BASE}/${userId}`);

export const addToCart = (userId, product) =>
  axios.post(`${API_BASE}`, { userId, product });

export const removeFromCart = (userId, productId) =>
  axios.delete(`${API_BASE}/${userId}/${productId}`);
