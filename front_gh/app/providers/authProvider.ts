import { loginService } from "~/services/authService";

export async function login(user: string, password: string) {
    try {
        const res = await loginService(user, password);

        if (!res || !res.data) {
            throw new Error("Respuesta inválida del servidor");
        }

        if (res.data.error) {
            console.error("Error Login AuthProvider:", res.data.error);
            throw new Error(res.data.error);
        }

        localStorage.setItem("token", res.data.token!);
        localStorage.setItem("tokenValido", "true");
        return { success: true };

    } catch (error: any) {
        if (error.response?.data?.error) {
            return { success: false, error: error.response.data.error };
        } else {
            return { success: false, error: error.message || "Error inesperado" };
        }
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenValido");
}
