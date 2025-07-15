
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { getEspecialidades } from '../../../servicios/EspecialidadServicio';
import { Especialidad } from '../../../tipos/especialidad';
import { colores } from '../../../tema/colores';
import { FontAwesome5 } from '@expo/vector-icons';

export const ListaEspecialidadesPantalla = () => {
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                setCargando(true);
                setError(null);
                const response = await getEspecialidades();
                setEspecialidades(response.data || response);
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
                setError('No se pudieron cargar las especialidades. ' + errorMessage);
                Alert.alert('Error', 'No se pudieron cargar las especialidades.');
                console.error('Error cargando especialidades:', e);
            } finally {
                setCargando(false);
            }
        };

        cargarEspecialidades();
    }, []);

    const handleSelectEspecialidad = (especialidad: Especialidad) => {
        Alert.alert('Especialidad seleccionada', `${especialidad.nombre}\n${especialidad.descripcion || 'Sin descripción disponible'}`);
    };

    const getIconoEspecialidad = (nombre: string) => {
        const nombreLower = nombre.toLowerCase();
        if (nombreLower.includes('cardiología')) return 'heartbeat';
        if (nombreLower.includes('neurología')) return 'brain';
        if (nombreLower.includes('pediatría')) return 'baby';
        if (nombreLower.includes('dermatología')) return 'hand-paper';
        if (nombreLower.includes('oftalmología')) return 'eye';
        if (nombreLower.includes('ginecología')) return 'female';
        if (nombreLower.includes('traumatología')) return 'bone';
        if (nombreLower.includes('psicología') || nombreLower.includes('psiquiatría')) return 'brain';
        return 'stethoscope';
    };

    const renderEspecialidad = ({ item }: { item: Especialidad }) => (
        <TouchableOpacity style={styles.tarjetaEspecialidad} onPress={() => handleSelectEspecialidad(item)}>
            <View style={styles.iconoEspecialidad}>
                <FontAwesome5 name={getIconoEspecialidad(item.nombre)} size={24} color={colores.primary} />
            </View>
            <View style={styles.infoEspecialidad}>
                <Text style={styles.nombreEspecialidad}>{item.nombre}</Text>
                <Text style={styles.descripcionEspecialidad} numberOfLines={2}>
                    {item.descripcion || 'Especialidad médica'}
                </Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color={colores.gray} />
        </TouchableOpacity>
    );

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
                <FontAwesome5 name="exclamation-triangle" size={48} color={colores.error} />
                <Text style={styles.textoError}>{error}</Text>
                <TouchableOpacity style={styles.botonReintentar} onPress={() => {
                    setError(null);
                    setCargando(true);
                    const cargarEspecialidades = async () => {
                        try {
                            const response = await getEspecialidades();
                            setEspecialidades(response.data || response);
                        } catch (e) {
                            const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
                            setError('No se pudieron cargar las especialidades. ' + errorMessage);
                        } finally {
                            setCargando(false);
                        }
                    };
                    cargarEspecialidades();
                }}>
                    <Text style={styles.textoBotonReintentar}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Especialidades Médicas</Text>
                <Text style={styles.subtitulo}>{especialidades.length} especialidades disponibles</Text>
            </View>
            
            <FlatList
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEspecialidad}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.contenedorVacio}>
                        <FontAwesome5 name="stethoscope" size={48} color={colores.gray} />
                        <Text style={styles.textoVacio}>No hay especialidades disponibles</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.background,
    },
    contenedorCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    encabezado: {
        padding: 20,
        backgroundColor: colores.white,
        borderBottomWidth: 1,
        borderBottomColor: colores.lightGray,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.text,
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 14,
        color: colores.gray,
    },
    lista: {
        padding: 16,
    },
    tarjetaEspecialidad: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colores.white,
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: colores.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconoEspecialidad: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colores.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoEspecialidad: {
        flex: 1,
    },
    nombreEspecialidad: {
        fontSize: 16,
        fontWeight: '600',
        color: colores.text,
        marginBottom: 4,
    },
    descripcionEspecialidad: {
        fontSize: 14,
        color: colores.gray,
    },
    textoCargando: {
        marginTop: 16,
        fontSize: 16,
        color: colores.gray,
        textAlign: 'center',
    },
    textoError: {
        marginTop: 16,
        fontSize: 16,
        color: colores.error,
        textAlign: 'center',
        marginBottom: 20,
    },
    botonReintentar: {
        backgroundColor: colores.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    textoBotonReintentar: {
        color: colores.white,
        fontSize: 14,
        fontWeight: '600',
    },
    contenedorVacio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    textoVacio: {
        marginTop: 16,
        fontSize: 16,
        color: colores.gray,
        textAlign: 'center',
    },
}); 