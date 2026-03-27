import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
});

export const getProducts = () => api.get('/products/');
export const createProduct = (data) => api.post('/products/', data);

export const calculateMSP = (data) => api.post('/costing/calculate', data);
export const saveCosting = (data) => api.post('/costing/save', data);
export const getCostingHistory = (productId) => api.get(`/costing/history/${productId}`);

export const getSales = () => api.get('/sales/');
export const recordSale = (data) => api.post('/sales/', data);

export const getDashboardSummary = () => api.get('/dashboard/summary');
export const getDashboardImpact = () => api.get('/dashboard/impact');

export default api;
