import axios from 'axios';

// This automatically picks the production URL when deployed, 
// and uses localhost when you're developing.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;