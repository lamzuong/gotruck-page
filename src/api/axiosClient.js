import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/gotruck/pageregister',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Origin, X-Auth-Token, Authorization',
  },
});
axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);
export default axiosClient;
