import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Api = axios.create({

  baseURL: 'http://localhost:8000/api', // your API base URL
});

Api.interceptors.response.use(

  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === 'token_not_valid'
    ) {
      // Token is invalid or expired
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('login') // or use navigate('/login')
    }

const navigate=useNavigate()

    return Promise.reject(error);
  }
);

export default Api;
