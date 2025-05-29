import { axiosInstance } from "~/utils/axiosConfig";

// Cambiar de nombreUsuario a email
export async function loginService(email: string, password: string) {
    try {
        return await axiosInstance.post("auth/login", { 
            email: email,
            password: password 
        });
    } catch (error) {
        console.error('Error Login AuthService: ', error);
        throw error; // Definición del error de manera correcta
    }
}

export async function validateTokenService(token: string) {
    try {
        return await axiosInstance.post("auth/validar-token", { token });
    } catch (error) {
        console.error('Error ValidateToken AuthService: ', error);
        throw error;
    }
}