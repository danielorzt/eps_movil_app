import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../tipos/navigation";
import { registerUser } from "../../../servicios/AutenticacionServicio";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export const RegistroPantalla = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // Añadido para el registro

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const userData = {
      nombre_usuario: name,
      email: email,
      contrasena: password,
      contrasena_confirmation: confirmPassword,
      rol_usuario: 'paciente' // Rol por defecto para nuevos registros desde la app
    };

    const result = await registerUser(userData);

    if (result.success) {
      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión.");
      navigation.replace("Login");
    } else {
      // Manejo de errores más detallado
      const errorMessage = result.error?.errors
        ? Object.values(result.error.errors).flat().join('\n')
        : result.error?.message || "Ocurrió un error desconocido.";
      Alert.alert("Error de Registro", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crear Cuenta</Text>

            <View style={styles.spaceY2}>
              <Text style={styles.textGray600}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.spaceY2}>
              <Text style={styles.textGray600}>Correo Electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.spaceY2}>
              <Text style={styles.textGray600}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.spaceY2}>
              <Text style={styles.textGray600}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                ¿Ya tienes una cuenta? Inicia Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#f4511e",
    fontSize: 16,
  },
  spaceY2: {
    marginBottom: 20,
  },
  textGray600: {
    color: "#6b7280",
  },
});
