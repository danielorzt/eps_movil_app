
export interface Usuario {
    id: number;
    name: string;
    email: string;
    role: 'paciente' | 'medico' | 'admin';
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
} 