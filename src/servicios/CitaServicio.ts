
import api from './api';

// Aquí irían las interfaces para los objetos de Cita
// export interface Cita { ... }

export const getCitas = async () => {
    const response = await api.get('/citas');
    return response.data;
};

export const getCitaById = async (id: number) => {
    const response = await api.get(`/citas/${id}`);
    return response.data;
};

export const getProximasCitasPorPaciente = async (pacienteId: number) => {
    const response = await api.get(`/citas/paciente/${pacienteId}/proximas`);
    return response.data;
}

// ... otros métodos para crear, actualizar, eliminar citas 