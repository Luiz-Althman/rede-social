import axios from 'axios';
import { API_URL } from '../../config/properties';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

export default axiosInstance;
