import axios from 'axios';

export const financeApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})