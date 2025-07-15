
import api from './api';

// export interface Medico { ... }

export const getMedicos = async () => {
    const response = await api.get('/medicos');
    return response.data;
};

export const getMedicoById = async (id: number) => {
    const response = await api.get(`/medicos/${id}`);
    return response.data;
}; 