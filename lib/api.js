import axios from "axios";

export const API_BASE_URL = "https://portfolio-backend-dykc.onrender.com";
export const API_URL = `${API_BASE_URL}/api/`;

const API = axios.create({
  baseURL: API_URL,
});

export const getProjects = async () => {
  try {
    const response = await API.get('projects/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export default API;