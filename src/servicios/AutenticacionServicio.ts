import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const iniciarSesionUsuario = async (email: string, contrasena: string) => {
    try {
        const response = await api.post("/auth/login", { email, contrasena });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error(
            "Error de login",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            error: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const registrarUsuario = async (data: any) => {
    try {
        const response = await api.post("/auth/register", data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            error: error.response ? error.response.data : "Error de conexión",
        };
    }
};

// Alias para compatibilidad con RegistroPantalla
export const registerUser = registrarUsuario;

export const obtenerToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem("userToken");
};

export const eliminarToken = async (): Promise<void> => {
    await AsyncStorage.removeItem("userToken");
}; 