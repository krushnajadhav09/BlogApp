import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Attach token to every request if exists
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors globally

export default Api;
