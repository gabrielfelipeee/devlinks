import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5207/api',
});
export default apiClient;
