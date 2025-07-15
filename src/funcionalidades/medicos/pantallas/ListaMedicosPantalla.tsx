
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { getMedicos } from '../../../servicios/MedicoServicio';
import { Medico } from '../../../tipos/medico';
import { colores } from '../../../tema/colores';
import { FontAwesome5 } from '@expo/vector-icons';

export const ListaMedicosPantalla = () => {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarMedicos = async () => {
            try {
                setCargando(true);
                setError(null);
                const response = await getMedicos();
                setMedicos(response.data || response);
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
                setError('No se pudieron cargar los médicos. ' + errorMessage);
                Alert.alert('Error', 'No se pudieron cargar los médicos.');
                console.error('Error cargando médicos:', e);
            } finally {
                setCargando(false);
            }
        };

        cargarMedicos();
    }, []);

    const handleSelectMedico = (medico: any) => {
        const nombre = medico.nombres_medico || medico.nombre;
        const apellido = medico.apellidos_medico || medico.apellido;
        const especialidad = medico.especialidad?.nombre_especialidad || medico.especialidad?.nombre || 'No especificada';
        Alert.alert('Médico seleccionado', `Dr. ${nombre} ${apellido}\nEspecialidad: ${especialidad}`);
    };

    const renderMedico = ({ item }: { item: Medico }) => (
        <TouchableOpacity style={styles.tarjetaMedico} onPress={() => handleSelectMedico(item)}>
            <View style={styles.iconoMedico}>
                <FontAwesome5 name="user-md" size={24} color={colores.primary} />
            </View>
            <View style={styles.infoMedico}>
                <Text style={styles.nombreMedico}>Dr. {item.nombres_medico || item.nombre} {item.apellidos_medico || item.apellido}</Text>
                <Text style={styles.especialidadMedico}>
                    {item.especialidad?.nombre_especialidad || item.especialidad?.nombre || 'Especialidad no especificada'}
                </Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color={colores.gray} />
        </TouchableOpacity>
    );

    if (cargando) {
        return (
            <View style={styles.contenedorCentrado}>
                <ActivityIndicator size="large" color={colores.primary} />
                <Text style={styles.textoCargando}>Cargando Médicos...</Text>
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
                    const cargarMedicos = async () => {
                        try {
                            const response = await getMedicos();
                            setMedicos(response.data || response);
                        } catch (e) {
                            const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido';
                            setError('No se pudieron cargar los médicos. ' + errorMessage);
                        } finally {
                            setCargando(false);
                        }
                    };
                    cargarMedicos();
                }}>
                    <Text style={styles.textoBotonReintentar}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Médicos Disponibles</Text>
                <Text style={styles.subtitulo}>{medicos.length} médicos encontrados</Text>
            </View>
            
            <FlatList
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMedico}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.contenedorVacio}>
                        <FontAwesome5 name="user-md" size={48} color={colores.gray} />
                        <Text style={styles.textoVacio}>No hay médicos disponibles</Text>
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
    tarjetaMedico: {
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
    iconoMedico: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colores.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoMedico: {
        flex: 1,
    },
    nombreMedico: {
        fontSize: 16,
        fontWeight: '600',
        color: colores.text,
        marginBottom: 4,
    },
    especialidadMedico: {
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