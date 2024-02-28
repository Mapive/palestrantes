import axios from 'axios';

const api = axios.create({
    timeout: 10000,
    baseURL: 'http://localhost:5000/' //---------------------- PORTA DO JASON SERVER
})

export default api;