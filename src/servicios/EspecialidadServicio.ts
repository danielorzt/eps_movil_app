
import api from './api';

// export interface Especialidad { ... }

export const getEspecialidades = async () => {
    try {
        const response = await api.get('/especialidades');
        return response.data;
    } catch (error) {
        console.error('Error al cargar especialidades, usando fallback:', error);
        
        // Fallback: especialidades básicas si la API falla
        const fallbackEspecialidades = [
            { id: 1, nombre: 'Medicina General', nombre_especialidad: 'Medicina General', descripcion: 'Atención primaria y consultas generales' },
            { id: 2, nombre: 'Pediatría', nombre_especialidad: 'Pediatría', descripcion: 'Atención médica para niños y adolescentes' },
            { id: 3, nombre: 'Cardiología', nombre_especialidad: 'Cardiología', descripcion: 'Diagnóstico y tratamiento de enfermedades del corazón' },
            { id: 4, nombre: 'Dermatología', nombre_especialidad: 'Dermatología', descripcion: 'Tratamiento de enfermedades de la piel' },
            { id: 5, nombre: 'Ginecología', nombre_especialidad: 'Ginecología y Obstetricia', descripcion: 'Salud reproductiva femenina' },
            { id: 6, nombre: 'Ortopedia', nombre_especialidad: 'Ortopedia y Traumatología', descripcion: 'Tratamiento de lesiones del sistema músculo-esquelético' },
            { id: 7, nombre: 'Neurología', nombre_especialidad: 'Neurología', descripcion: 'Diagnóstico y tratamiento de enfermedades del sistema nervioso' },
            { id: 8, nombre: 'Psiquiatría', nombre_especialidad: 'Psiquiatría', descripcion: 'Salud mental y trastornos psiquiátricos' },
            { id: 9, nombre: 'Oftalmología', nombre_especialidad: 'Oftalmología', descripcion: 'Cuidado de los ojos y tratamiento de enfermedades oculares' }
        ];
        
        return {
            status: true,
            data: fallbackEspecialidades,
            message: 'Especialidades cargadas desde fallback'
        };
    }
}; 