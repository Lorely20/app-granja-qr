import axios from 'axios';

const API_URL = "https://granja-umg.onrender.com/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};
