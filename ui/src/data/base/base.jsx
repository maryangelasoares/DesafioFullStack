import axios from 'axios';

const api = axios.create({
    baseurl:'http://localhost:3000'
}) 

export default api;