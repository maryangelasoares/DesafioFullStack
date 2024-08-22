import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/projetosAcoes',
});
//instancia login
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

api.interceptors.response.use(
    response => response.data,
    error => {
        console.error('Erro ao buscar projetos/ações', error);
        throw error;
    }
);

export const getProjetosAcoes = async () => {
    return await api.get('/projetosAcoes');
};
