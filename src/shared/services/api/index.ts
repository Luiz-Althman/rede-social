import axios from 'axios';
import { API_URL } from '../../config/properties';

export const uri = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

export default axiosInstance;
