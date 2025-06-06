import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: 'http://localhost:8000'
});

// Export the Axios instance for use in other parts of the application
export default api;