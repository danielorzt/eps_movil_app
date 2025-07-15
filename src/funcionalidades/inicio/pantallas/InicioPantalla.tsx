import React from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useAutenticacion } from '../../../contexto/ContextoAutenticacion';
import { colores } from '../../../tema/colores';
import { PanelPaciente } from '../componentes/PanelPaciente';
import { PanelMedico } from '../componentes/PanelMedico';
import { PanelAdmin } from '../componentes/PanelAdmin';

export const InicioPantalla = () => {
  const { usuario, cargando } = useAutenticacion();

  const renderContent = () => {
    if (cargando) {
      return <ActivityIndicator size="large" color={colores.primary} />;
    }

    switch (usuario?.rol_usuario) {
      case 'paciente':
        return <PanelPaciente />;
      case 'medico':
        return <PanelMedico />;
      case 'administrador':
        return <PanelAdmin />;
      default:
        return (
          <View style={styles.centered}>
            <Text>Rol no reconocido o usuario no disponible.</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Hola, {usuario?.nombre_usuario || 'Usuario'}!</Text>
        <Text style={styles.subtitle}>Bienvenido a EPSMÓVIL</Text>
      </View>
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.background,
  },
  header: {
    backgroundColor: colores.primary,
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.white,
  },
  subtitle: {
    fontSize: 18,
    color: colores.white,
    opacity: 0.9,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  }
});