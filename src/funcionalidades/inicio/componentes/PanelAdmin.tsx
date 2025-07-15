import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colores } from '../../../tema/colores';

export const PanelAdmin = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel de Administración</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card}>
                    <FontAwesome5 name="chart-line" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Estadísticas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <FontAwesome5 name="users-cog" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Gestionar Usuarios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.secondary,
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: colores.white,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: colores.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        color: colores.text,
        textAlign: 'center',
    },
});

// export default PanelAdmin; 