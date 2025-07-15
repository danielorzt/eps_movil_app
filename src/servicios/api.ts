// Ejemplo de servicio para conectar con APIs Laravel/PHP

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuración para API Laravel
const API_BASE_URL = "http://172.26.240.1:8000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos timeout
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const RutasPublicas = ["/auth/login", "/auth/register"];

api.interceptors.request.use(
    async (config) => {
        // Solo proceder si la URL está definida
        if (config.url) {
            const isRutaPublica = RutasPublicas.some((route) =>
                config.url!.includes(route)
            );

            if (!isRutaPublica) {
                // Priorizar el token del contexto de autenticación
                const userToken = await AsyncStorage.getItem("@EPSMOVIL:token") ||
                    await AsyncStorage.getItem("userToken");
                if (userToken) {
                    config.headers.Authorization = `Bearer ${userToken}`;
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Solo proceder si la URL está definida en la petición original
        if (originalRequest?.url) {
            const isRutaPublica = RutasPublicas.some((route) =>
                originalRequest.url!.includes(route)
            );

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                !isRutaPublica
            ) {
                originalRequest._retry = true;
                console.log("Token expirado o no autorizado. Limpiando tokens...");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("@EPSMOVIL:token");
                await AsyncStorage.removeItem("@EPSMOVIL:usuario");
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// Puedes agregar más funciones para otros endpoints aquí 