
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AutenticacionServicio from '../servicios/AutenticacionServicio';
import { Usuario } from '../tipos/usuario';
import api from '../servicios/api';

interface ContextoAutenticacionData {
    autenticado: boolean;
    usuario: Usuario | null;
    cargando: boolean;
    iniciarSesion: (email: string, contrasena: string) => Promise<{ success: boolean; error?: any }>;
    cerrarSesion: () => void;
}

const ContextoAutenticacion = createContext<ContextoAutenticacionData>({} as ContextoAutenticacionData);

export const ProveedorAutenticacion = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarDatosAlmacenados() {
            const usuarioAlmacenado = await AsyncStorage.getItem('@EPSMOVIL:usuario');
            const tokenAlmacenado = await AsyncStorage.getItem('@EPSMOVIL:token');

            if (usuarioAlmacenado && tokenAlmacenado) {
                setUsuario(JSON.parse(usuarioAlmacenado));
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenAlmacenado}`;
            }
            setCargando(false);
        }
        cargarDatosAlmacenados();
    }, []);

    const iniciarSesion = async (email: string, contrasena: string) => {
        setCargando(true);
        const response = await AutenticacionServicio.iniciarSesionUsuario(email, contrasena);
        setCargando(false);

        if (response.success && response.data) {
            setUsuario(response.data.data);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

            await AsyncStorage.setItem('@EPSMOVIL:usuario', JSON.stringify(response.data.data));
            await AsyncStorage.setItem('@EPSMOVIL:token', response.data.access_token);
            return { success: true };
        } else {
            return { success: false, error: response.error || 'Error desconocido' };
        }
    };

    const cerrarSesion = async () => {
        await AsyncStorage.clear();
        setUsuario(null);
        api.defaults.headers.common['Authorization'] = '';
    };

    return (
        <ContextoAutenticacion.Provider value={{ autenticado: !!usuario, usuario, cargando, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoAutenticacion.Provider>
    );
};

export function useAutenticacion() {
    const context = useContext(ContextoAutenticacion);
    return context;
} 