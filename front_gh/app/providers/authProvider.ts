import { loginService } from "~/services/authService";

// Cambiar de nombreUsuario a email
export async function login(email: string, password: string) {
    try {
        const res = await loginService(email, password);

        if (!res || !res.data) {
            throw new Error("Respuesta inválida del servidor");
        }

        // Faltaba verificar que la respuesta tenga access_token (según AuthService del backend)
        if (res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("tokenValido", "true");
            return { success: true };
        } else {
            throw new Error("Token no recibido del servidor");
        }

    } catch (error: any) {
        console.error("Error en login:", error);
        
        if (error.response?.data?.message) {
            return { success: false, error: error.response.data.message };
        } else if (error.response?.status === 401) {
            return { success: false, error: "Email o contraseña incorrectos" };
        } else {
            return { success: false, error: error.message || "Error inesperado" };
        }
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenValido");
}