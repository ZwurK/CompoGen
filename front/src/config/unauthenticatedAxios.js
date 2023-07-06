import axios from 'axios';

const unauthenticatedAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default unauthenticatedAxios;
