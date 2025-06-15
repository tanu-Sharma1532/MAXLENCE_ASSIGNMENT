import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const register = async (formData) => {
    return API.post('/auth/register', formData);
};

export const login = async (credentials) => {
    return API.post('/auth/login', credentials);
};

export const sendReset = async (email) => {
    return API.post('/auth/password-reset/request', { email });
};

export const reset = async (token, password) => {
    return API.post('/auth/password-reset/reset', { token, password });
};

export const fetchUsers = async (search = '') => {
    return API.get('/user/all', { params: { search } });
};

export const fetchProfile = async (token) => {
    return API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
};

export const updateProfile = async (token, formData) => {
    return API.put('/auth/me', formData, { headers: { Authorization: `Bearer ${token}` } });
};

