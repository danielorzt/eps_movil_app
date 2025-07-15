import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/tema/ThemeContext';
import NavegadorPrincipal from './src/Navegacion/Stacks/NavegadorPrincipal';
import { ProveedorAutenticacion } from './src/contexto/ContextoAutenticacion';

export default function App() {
  return (
    <ThemeProvider>
      <ProveedorAutenticacion>
        <StatusBar style="auto" />
        <NavegadorPrincipal />
      </ProveedorAutenticacion>
    </ThemeProvider>
  );
}