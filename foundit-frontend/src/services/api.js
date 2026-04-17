import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const getLostItems = () => axios.get(`${API_URL}/lost`);
export const getFoundItems = () => axios.get(`${API_URL}/found`);
export const reportLostItem = (data) => axios.post(`${API_URL}/lost`, data);
export const reportFoundItem = (data) => axios.post(`${API_URL}/found`, data);
