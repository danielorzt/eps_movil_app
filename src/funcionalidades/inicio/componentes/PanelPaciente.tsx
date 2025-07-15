import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colores } from '../../../tema/colores';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InicioStackParamList } from '../../../Navegacion/Stacks/InicioStack';


type NavigationProps = NativeStackNavigationProp<InicioStackParamList>;

export const PanelPaciente = () => {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Portal de Paciente</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Citas')}>
                    <FontAwesome5 name="calendar-check" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Mis Citas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListaEspecialidades')}>
                    <FontAwesome5 name="plus-circle" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Reservar Cita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medicos')}>
                    <FontAwesome5 name="user-md" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Buscar Médicos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Perfil')}>
                    <FontAwesome5 name="user-cog" size={40} color={colores.primary} />
                    <Text style={styles.cardText}>Mi Perfil</Text>
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