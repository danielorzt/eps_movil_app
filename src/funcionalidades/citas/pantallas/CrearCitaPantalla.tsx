
import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Alert,
    SafeAreaView,
    Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { colores } from '../../../tema/colores';
import { getEspecialidades } from '../../../servicios/EspecialidadServicio';
import { getMedicos } from '../../../servicios/MedicoServicio';
import { Especialidad } from '../../../tipos/especialidad';
import { Medico } from '../../../tipos/medico';

const CrearCitaPantalla = () => {
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([]);
    const [cargando, setCargando] = useState(true);

    // Estados del formulario
    const [formData, setFormData] = useState({
        especialidadId: '',
        medicoId: '',
        fecha: '',
        hora: '',
        motivo: '',
    });

    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    useEffect(() => {
        if (formData.especialidadId) {
            const medicosFilt = medicos.filter(
                medico => (medico.especialidad_id || medico.especialidad?.id)?.toString() === formData.especialidadId
            );
            setMedicosFiltrados(medicosFilt);
            // Reset médico selection cuando cambia especialidad
            setFormData(prev => ({ ...prev, medicoId: '' }));
        } else {
            setMedicosFiltrados([]);
        }
    }, [formData.especialidadId, medicos]);

    const cargarDatosIniciales = async () => {
        try {
            setCargando(true);
            const [especialidadesData, medicosData] = await Promise.all([
                getEspecialidades(),
                getMedicos()
            ]);
            
            setEspecialidades(especialidadesData.data || especialidadesData);
            setMedicos(medicosData.data || medicosData);
        } catch (error) {
            console.error('Error cargando datos:', error);
            Alert.alert('Error', 'No se pudieron cargar los datos necesarios');
        } finally {
            setCargando(false);
        }
    };

    const handleSubmit = () => {
        if (!formData.especialidadId || !formData.medicoId || !formData.fecha || !formData.hora) {
            Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
            return;
        }

        // Aquí implementarías la lógica para crear la cita
        Alert.alert(
            'Cita Creada',
            'Tu cita ha sido agendada exitosamente',
            [{ text: 'OK' }]
        );
    };

    const SelectPicker = ({ label, selectedValue, onValueChange, items, placeholder }: {
        label: string;
        selectedValue: string;
        onValueChange: (value: string) => void;
        items: Array<{ label: string; value: string }>;
        placeholder: string;
    }) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label={placeholder} value="" color={colores.gray} />
                    {items.map((item) => (
                        <Picker.Item 
                            key={item.value} 
                            label={item.label} 
                            value={item.value} 
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );

    if (cargando) {
        return (
            <View style={styles.containerCentrado}>
                <FontAwesome5 name="spinner" size={32} color={colores.primary} />
                <Text style={styles.textoCargando}>Cargando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <FontAwesome5 name="calendar-plus" size={32} color={colores.primary} />
                    <Text style={styles.title}>Agendar Nueva Cita</Text>
                    <Text style={styles.subtitle}>Completa la información para agendar tu cita médica</Text>
                </View>

                <View style={styles.form}>
                    <SelectPicker
                        label="Especialidad *"
                        selectedValue={formData.especialidadId}
                        onValueChange={(value) => setFormData({...formData, especialidadId: value})}
                        items={especialidades.map(esp => ({
                            label: esp.nombre_especialidad || esp.nombre,
                            value: esp.id.toString()
                        }))}
                        placeholder="Selecciona una especialidad"
                    />

                    <SelectPicker
                        label="Médico *"
                        selectedValue={formData.medicoId}
                        onValueChange={(value) => setFormData({...formData, medicoId: value})}
                        items={medicosFiltrados.map(medico => ({
                            label: `Dr. ${medico.nombres_medico || medico.nombre} ${medico.apellidos_medico || medico.apellido}`,
                            value: medico.id.toString()
                        }))}
                        placeholder={formData.especialidadId ? "Selecciona un médico" : "Primero selecciona una especialidad"}
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Fecha *</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.fecha}
                            onChangeText={(text) => setFormData({...formData, fecha: text})}
                            placeholder="DD/MM/AAAA"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Hora *</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.hora}
                            onChangeText={(text) => setFormData({...formData, hora: text})}
                            placeholder="HH:MM"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Motivo de la consulta</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={formData.motivo}
                            onChangeText={(text) => setFormData({...formData, motivo: text})}
                            placeholder="Describe brevemente el motivo de tu consulta (opcional)"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <FontAwesome5 name="calendar-check" size={20} color={colores.white} />
                        <Text style={styles.submitButtonText}>Agendar Cita</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.background,
    },
    containerCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.background,
    },
    textoCargando: {
        marginTop: 16,
        fontSize: 16,
        color: colores.gray,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: colores.white,
        borderBottomWidth: 1,
        borderBottomColor: colores.lightGray,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.text,
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colores.gray,
        textAlign: 'center',
        lineHeight: 22,
    },
    form: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colores.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colores.white,
        borderWidth: 1,
        borderColor: colores.lightGray,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colores.text,
    },
    textArea: {
        height: 100,
    },
    pickerContainer: {
        backgroundColor: colores.white,
        borderWidth: 1,
        borderColor: colores.lightGray,
        borderRadius: 12,
        overflow: 'hidden',
    },
    picker: {
        height: Platform.OS === 'ios' ? 200 : 50,
        color: colores.text,
    },
    submitButton: {
        backgroundColor: colores.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 12,
        marginTop: 20,
    },
    submitButtonText: {
        color: colores.white,
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
    },
});

export default CrearCitaPantalla; 