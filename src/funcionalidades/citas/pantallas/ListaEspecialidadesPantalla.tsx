
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getEspecialidades } from '../../../servicios/EspecialidadServicio';
import { Especialidad } from '../../../tipos/especialidad';
import { colores } from '../../../tema/colores';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { CitasStackParamList } from '../../../Navegacion/Stacks/CitasStack';
import { InicioStackParamList } from '../../../Navegacion/Stacks/InicioStack';

type Props = NativeStackScreenProps<InicioStackParamList, 'ListaEspecialidades'>;

export const ListaEspecialidadesPantalla = ({ navigation }: Props) => {
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                setCargando(true);
                setError(null);
                const data = await getEspecialidades();
                setEspecialidades(data);
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
                setError('No se pudieron cargar las especialidades. ' + errorMessage);
                Alert.alert('Error', 'No se pudieron cargar las especialidades.');
            } finally {
                setCargando(false);
            }
        };

        cargarEspecialidades();
    }, []);

    const handleSelectEspecialidad = (especialidad: Especialidad) => {
        // Navegar a la pantalla de selección de médico, pasando el ID de la especialidad
        // navigation.navigate('ListaMedicos', { especialidadId: especialidad.id });
        Alert.alert('Próximamente', `Ha seleccionado la especialidad: ${especialidad.nombre}`);
    };

    if (cargando) {
        return (
            <View style={styles.contenedorCentrado}>
                <ActivityIndicator size="large" color={colores.primary} />
                <Text style={styles.textoCargando}>Cargando Especialidades...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.contenedorCentrado}>
                <FontAwesome5 name="exclamation-triangle" size={50} color={colores.danger} />
                <Text style={styles.textoError}>{error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Especialidad }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectEspecialidad(item)}>
            <View style={styles.itemIcono}>
                <FontAwesome5 name="stethoscope" size={24} color={colores.primary} />
            </View>
            <View style={styles.itemTextoContainer}>
                <Text style={styles.itemTitulo}>{item.nombre}</Text>
                <Text style={styles.itemDescripcion}>{item.descripcion}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color={colores.neutral} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Seleccione una Especialidad</Text>
            <FlatList
                data={especialidades}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <View style={styles.contenedorCentrado}>
                        <Text>No hay especialidades disponibles.</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.background,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colores.text,
        padding: 20,
        paddingBottom: 10,
    },
    contenedorCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textoCargando: {
        marginTop: 10,
        fontSize: 16,
        color: colores.text,
    },
    textoError: {
        marginTop: 20,
        fontSize: 16,
        color: colores.danger,
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colores.white,
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemIcono: {
        marginRight: 15,
        backgroundColor: `${colores.primary}1A`, // Primary con 10% de opacidad
        padding: 12,
        borderRadius: 25,
    },
    itemTextoContainer: {
        flex: 1,
    },
    itemTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colores.text,
    },
    itemDescripcion: {
        fontSize: 14,
        color: colores.neutral,
        marginTop: 2,
    },
}); 