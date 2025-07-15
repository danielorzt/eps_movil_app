
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListaCitasPantalla } from '../../funcionalidades/citas/pantallas/ListaCitasPantalla';
// import DetalleCitaPantalla from '../../funcionalidades/citas/pantallas/DetalleCitaPantalla';
// import CrearCitaPantalla from '../../funcionalidades/citas/pantallas/CrearCitaPantalla';

export type CitasStackParamList = {
    ListaCitas: undefined;
    // DetalleCita: { citaId: number };
    // CrearCita: undefined;
};

const Stack = createNativeStackNavigator<CitasStackParamList>();

const PilaCitas = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ListaCitas" component={ListaCitasPantalla} />
            {/* <Stack.Screen name="DetalleCita" component={DetalleCitaPantalla} /> */}
            {/* <Stack.Screen name="CrearCita" component={CrearCitaPantalla} /> */}
        </Stack.Navigator>
    );
};

export default PilaCitas; 