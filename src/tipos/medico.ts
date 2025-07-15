
import { Especialidad } from './especialidad';

export interface Medico {
    id: number;
    nombre: string;
    apellido: string;
    especialidad_id: number;
    especialidad?: Especialidad; // Relación opcional
    created_at?: string;
    updated_at?: string;
} 