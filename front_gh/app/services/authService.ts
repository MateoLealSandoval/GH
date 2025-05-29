import { axiosInstance } from "~/utils/axiosConfig";

export async function loginService(user: string, password: string) {
    try {
        return await axiosInstance.post("login", { nombreUsuario: user, contrasena: password });
    } catch (error) {
        console.error('Error Login AuthService: ', error);
    }
}

export async function validateTokenService(token: string) {
    try {
        return await axiosInstance.post("validar-token", { token });
    } catch (error) {
        console.error('Error ValidateToken AuthService: ', error);
    }
}