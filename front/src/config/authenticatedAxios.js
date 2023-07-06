import axios from 'axios';

const authenticatedAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

authenticatedAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default authenticatedAxios ; 
