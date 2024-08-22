import api from '../base/base';

const getAll = async () => {
    const response = await api.get(`/usuarios`);
    return response.data;
}

const getById = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
}

const post = async (dto) => {
    const response = await api.post(`/usuarios`);
    return response.data;
}

const put = async (id, dto) => {
    const response = await api.put(`/usuarios/${id}`);
    return response.data;
}

const deleteUser = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
}

userRepository = (
    getAll,
    getById,
    post,
    put,
    deleteUser
);

export default userRepository;