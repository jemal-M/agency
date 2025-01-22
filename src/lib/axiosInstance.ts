import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || null;

const axiosInstance = axios.create({
  baseURL: '/api', // Ensure this is correct
  withCredentials:true,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    
  },
});

 

export default axiosInstance;
