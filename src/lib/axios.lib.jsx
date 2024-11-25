// apiClient.js

import axios from 'axios';
import { getAccessToken, removeAccessToken } from '../utils/cookies/cookie';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}api`, // Replace with your API's base URL
  timeout: 10000, // Request timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Add logic to modify the request, such as adding an Authorization token
    const token = getAccessToken(); // Retrieve the token from localStorage or state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code in the 2xx range triggers this function
    return {data: response.data, status: response.status};
     // Simplify the response structure for easier use
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 403) {
      // Optionally handle unauthorized access (e.g., redirect to login)

      
     // removeAccessToken();
     // window.location.href = '/login';
      console.error('API returned 401 Unauthorized.');
    }
    return Promise.reject(error); // Propagate the error to the calling function
  }
);

export default apiClient;
