
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAutenticacion } from '../../../contexto/ContextoAutenticacion';
import { getProximasCitasPorPaciente } from '../../../servicios/CitaServicio';
import { Cita } from '../../../tipos/cita';
import { colores } from '../../../tema/colores';
import { FontAwesome5 } from '@expo/vector-icons';

// Para obtener el id del paciente del usuario autenticado
// Esto es una suposición, necesitaríamos ver el modelo de Usuario y Paciente en Laravel
// para saber la relación exacta. Asumiremos que user.paciente.id existe.
// Si no, necesitaremos obtenerlo de otra forma.
// Por ahora, para que funcione, asumiré que el ID de usuario es el ID de paciente.
// En un caso real, podría ser user.paciente_id o algo similar.

export const ListaCitasPantalla = () => {
    const { usuario } = useAutenticacion();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCitas = async () => {
            // ¡IMPORTANTE! Asumiendo que user.id corresponde a paciente.id
            // Esto podría necesitar un ajuste según tu estructura de BD en Laravel
            if (!usuario?.id) {
                setError("Usuario no autenticado correctamente.");
                setCargando(false);
                return;
            }

            try {
                const response = await getProximasCitasPorPaciente(usuario.id);
                if (response.status) {
                    setCitas(response.data);
                } else {
                    setError(response.message || 'Error al cargar las citas.');
                }
            } catch (e) {
                setError('Ocurrió un error de red. Inténtalo de nuevo.');
                console.error(e);
            } finally {
                setCargando(false);
            }
        };

        fetchCitas();
    }, [usuario]);

    const renderEstadoCita = (estado: string) => {
        const style = [styles.estadoBadge];
        let icon = "check-circle";
        let color = colores.success;
        let texto = "Confirmada";

        switch (estado) {
            case 'programada':
                style.push(styles.estadoProgramada);
                icon = 'calendar-alt';
                color = colores.primary;
                texto = 'Programada';
                break;
            case 'completada':
                style.push(styles.estadoCompletada);
                icon = 'check-circle';
                color = colores.success;
                texto = 'Completada';
                break;
            case 'cancelada':
                style.push(styles.estadoCancelada);
                icon = 'times-circle';
                color = colores.danger;
                texto = 'Cancelada';
                break;
        }
        return (
            <View style={style}>
                <FontAwesome5 name={icon} size={14} color={color} />
                <Text style={[styles.estadoTexto, { color }]}>{texto}</Text>
            </View>
        );
    };

    const renderItem = ({ item }: { item: Cita }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Cita con Dr. {item.medico?.nombre}</Text>
                {renderEstadoCita(item.estado)}
            </View>
            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <FontAwesome5 name="hospital" size={16} color={colores.textSecondary} />
                    <Text style={styles.infoText}>Especialidad: {item.especialidad?.nombre}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome5 name="calendar-day" size={16} color={colores.textSecondary} />
                    <Text style={styles.infoText}>Fecha: {new Date(item.fecha_cita).toLocaleDateString()}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome5 name="clock" size={16} color={colores.textSecondary} />
                    <Text style={styles.infoText}>Hora: {item.hora_cita}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (cargando) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colores.primary} />
                <Text>Cargando tus citas...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Mis Próximas Citas</Text>
            <FlatList
                data={citas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.centered}>
                        <Text>No tienes citas próximas.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colores.secondary,
        padding: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: colores.white,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: colores.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colores.border,
        paddingBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colores.text,
    },
    cardBody: {
        //
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: colores.textSecondary,
    },
    errorText: {
        fontSize: 16,
        color: colores.danger,
    },
    estadoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    estadoProgramada: {
        backgroundColor: `${colores.primary}20`, // 20 es la opacidad en hexadecimal
    },
    estadoCompletada: {
        backgroundColor: `${colores.success}20`,
    },
    estadoCancelada: {
        backgroundColor: `${colores.danger}20`,
    },
    estadoTexto: {
        marginLeft: 5,
        fontWeight: 'bold',
    }
});

// export default ListaCitasPantalla; 