import axios from 'axios';
import { TOKEN_NAME } from '../index';

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const addAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}` },
  };
};
