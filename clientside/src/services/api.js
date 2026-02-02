import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth APIs
export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const signup = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
};

// Course APIs
export const getCourses = async () => {
    const response = await api.get('/courses');
    return response.data;
};

export const getCourse = async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
};

// Subscription APIs
export const subscribe = async (courseId, promoCode = null) => {
    const response = await api.post('/subscribe', { courseId, promoCode });
    return response.data;
};

export const validatePromo = async (courseId, promoCode) => {
    const response = await api.post('/validate-promo', { courseId, promoCode });
    return response.data;
};

export const getMyCourses = async () => {
    const response = await api.get('/my-courses');
    return response.data;
};

export default api;
