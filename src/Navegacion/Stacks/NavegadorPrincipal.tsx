import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import NavegadorAutenticacion from './NavegadorAutenticacion';
import { NavegadorTabsPrincipal } from '../NavegadorTabsPrincipal';
import { useAutenticacion } from '../../contexto/ContextoAutenticacion';

export default function NavegadorPrincipal() {
  const { autenticado, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {autenticado ? <NavegadorTabsPrincipal /> : <NavegadorAutenticacion />}
    </NavigationContainer>
  );
}
