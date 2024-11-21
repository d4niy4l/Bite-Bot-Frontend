// apiClient.js

import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}api`, // Replace with your API's base URL
  timeout: 10000, // Request timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // Add logic to modify the request, such as adding an Authorization token
//     const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage or state
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code in the 2xx range triggers this function
    return response.data; // Simplify the response structure for easier use
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized access (e.g., redirect to login)
      console.error('API returned 401 Unauthorized.');
    }
    return Promise.reject(error); // Propagate the error to the calling function
  }
);

export default apiClient;
