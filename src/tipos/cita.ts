
export interface Cita {
    id: number;
    paciente_id: number;
    medico_id: number;
    especialidad_id: number;
    fecha_cita: string;
    hora_cita: string;
    estado: 'programada' | 'completada' | 'cancelada';
    created_at?: string;
    updated_at?: string;
} 