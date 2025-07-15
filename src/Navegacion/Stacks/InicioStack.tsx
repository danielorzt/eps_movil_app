
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InicioPantalla } from '../../funcionalidades/inicio/pantallas/InicioPantalla';
import { ListaEspecialidadesPantalla } from '../../funcionalidades/citas/pantallas/ListaEspecialidadesPantalla';

export type InicioStackParamList = {
    InicioPantalla: undefined;
    ListaEspecialidades: undefined;
    // Futuras pantallas del flujo de reserva aquí:
    // ListaMedicos: { especialidadId: number };
    // ConfirmarCita: { medicoId: number; fecha: string };
};

const Stack = createNativeStackNavigator<InicioStackParamList>();

const InicioStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InicioPantalla" component={InicioPantalla} />
            <Stack.Screen
                name="ListaEspecialidades"
                component={ListaEspecialidadesPantalla}
                options={{
                    headerShown: true,
                    title: 'Reservar Cita: Especialidades'
                }}
            />
        </Stack.Navigator>
    );
};

export default InicioStack; 