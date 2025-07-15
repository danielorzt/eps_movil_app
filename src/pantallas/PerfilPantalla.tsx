import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput, 
  Alert,
  ScrollView,
  Modal
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useAutenticacion } from "../contexto/ContextoAutenticacion";
import { colores } from "../tema/colores";

export const PerfilPantalla = () => {
  const { usuario, cerrarSesion } = useAutenticacion();
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState({
    nombre: usuario?.nombre_usuario || '',
    email: usuario?.email || '',
  });

  const handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Cerrar Sesión", 
          style: "destructive",
          onPress: cerrarSesion 
        }
      ]
    );
  };

  const handleGuardarPerfil = () => {
    // Aquí implementarías la lógica para actualizar el perfil
    Alert.alert(
      "Perfil Actualizado",
      "Los cambios se han guardado correctamente.",
      [{ text: "OK", onPress: () => setModalEditarVisible(false) }]
    );
  };

  const InfoItem = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} size={20} color={colores.primary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user-circle" size={80} color={colores.primary} />
          </View>
          <Text style={styles.nombreUsuario}>{usuario?.nombre_usuario}</Text>
          <Text style={styles.rolUsuario}>{usuario?.rol_usuario}</Text>
        </View>

        {/* Información del Perfil */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Información Personal</Text>
          
          <InfoItem 
            icon="user" 
            label="Nombre de Usuario" 
            value={usuario?.nombre_usuario || 'No especificado'} 
          />
          
          <InfoItem 
            icon="envelope" 
            label="Correo Electrónico" 
            value={usuario?.email || 'No especificado'} 
          />
          
          <InfoItem 
            icon="user-tag" 
            label="Rol" 
            value={usuario?.rol_usuario || 'No especificado'} 
          />
        </View>

        {/* Acciones */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Acciones</Text>
          
          <TouchableOpacity 
            style={styles.botonAccion} 
            onPress={() => setModalEditarVisible(true)}
          >
            <FontAwesome5 name="edit" size={20} color={colores.primary} />
            <Text style={styles.textoBotonAccion}>Editar Perfil</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colores.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonAccion}>
            <FontAwesome5 name="key" size={20} color={colores.primary} />
            <Text style={styles.textoBotonAccion}>Cambiar Contraseña</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colores.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonAccion}>
            <FontAwesome5 name="bell" size={20} color={colores.primary} />
            <Text style={styles.textoBotonAccion}>Notificaciones</Text>
            <FontAwesome5 name="chevron-right" size={16} color={colores.gray} />
          </TouchableOpacity>
        </View>

        {/* Cerrar Sesión */}
        <View style={styles.seccion}>
          <TouchableOpacity 
            style={styles.botonCerrarSesion} 
            onPress={handleCerrarSesion}
          >
            <FontAwesome5 name="sign-out-alt" size={20} color={colores.white} />
            <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Editar Perfil */}
      <Modal
        visible={modalEditarVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setModalEditarVisible(false)}
              style={styles.botonCancelar}
            >
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.tituloModal}>Editar Perfil</Text>
            <TouchableOpacity 
              onPress={handleGuardarPerfil}
              style={styles.botonGuardar}
            >
              <Text style={styles.textoGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.campoFormulario}>
              <Text style={styles.labelCampo}>Nombre de Usuario</Text>
              <TextInput
                style={styles.inputCampo}
                value={editandoPerfil.nombre}
                onChangeText={(text) => setEditandoPerfil({...editandoPerfil, nombre: text})}
                placeholder="Ingresa tu nombre"
              />
            </View>

            <View style={styles.campoFormulario}>
              <Text style={styles.labelCampo}>Correo Electrónico</Text>
              <TextInput
                style={styles.inputCampo}
                value={editandoPerfil.email}
                onChangeText={(text) => setEditandoPerfil({...editandoPerfil, email: text})}
                placeholder="Ingresa tu correo"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.background,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: colores.white,
    borderBottomWidth: 1,
    borderBottomColor: colores.lightGray,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  nombreUsuario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.text,
    marginBottom: 4,
  },
  rolUsuario: {
    fontSize: 16,
    color: colores.gray,
    textTransform: 'capitalize',
  },
  seccion: {
    marginTop: 20,
    backgroundColor: colores.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: '600',
    color: colores.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.lightGray,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colores.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colores.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: colores.text,
    fontWeight: '500',
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colores.lightGray,
  },
  textoBotonAccion: {
    flex: 1,
    fontSize: 16,
    color: colores.text,
    marginLeft: 16,
  },
  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.error,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  textoCerrarSesion: {
    color: colores.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colores.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colores.white,
    borderBottomWidth: 1,
    borderBottomColor: colores.lightGray,
  },
  botonCancelar: {
    padding: 8,
  },
  textoCancelar: {
    color: colores.gray,
    fontSize: 16,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: '600',
    color: colores.text,
  },
  botonGuardar: {
    padding: 8,
  },
  textoGuardar: {
    color: colores.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  campoFormulario: {
    marginBottom: 20,
  },
  labelCampo: {
    fontSize: 16,
    color: colores.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputCampo: {
    backgroundColor: colores.white,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colores.lightGray,
  },
});
