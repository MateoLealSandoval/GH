import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import { useState } from "react"
import { login } from "~/providers/authProvider"
import { useNavigate } from "react-router"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("") // Cambiar de user a email
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [showPassword, setShowPassword] = useState(false)

    const [isLoading, setIsLoading] = useState(false) // Por buenas practicas se recomienda usar estado de carga

    function validate() {
        const newErrors: typeof errors = {}

        // Se hace la validación de email y se agrega el retorno de errores respectivamente
        if (!email.trim()) {
            newErrors.email = "El email es requerido"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "El email no es válido"
        }
        
        if (!password) {
            newErrors.password = "La contraseña es requerida"
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true); // Por buenas practicas se debe activar el estado de carga

        // Por buenas practicas no se debe dejar el const result suelto por lo que se agrega el try-catch con finaly para desactivar el estado de carga
        try {
            const result = await login(email, password); // Se pasa el email en lugar de user

            if (result.success) {
                console.log("Inicio de sesión exitoso");
                navigate("/dashboard");
            } else {
                console.log("Error de login:", result.error);
                // Se define el error específico
                setErrors({ 
                    email: result.error?.includes("email") ? result.error : undefined,
                    password: !result.error?.includes("email") ? result.error : undefined 
                });
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            setErrors({ password: "Error de conexión con el servidor" });
        } finally {
            setIsLoading(false); // Se desactiva el estado de carga
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Inicia sesión</h1>
            </div>
            <div className="grid gap-6">

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label> {/* Cambiar label de user a email*/}
                    <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        disabled={isLoading} // Deshabilitar durante carga
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Contraseña</Label>
                        {/* <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Olvidaste tu contraseña?
                        </a> */}
                    </div>
                    <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        disabled={isLoading} // Deshabilitar durante carga
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center gap-2 ">
                    <Label className="text-sm font-normal">Mostrar contraseña</Label>
                    <Checkbox 
                        checked={showPassword}
                        onCheckedChange={(val) => setShowPassword(!!val)} 
                        disabled={isLoading} // Deshabilitar durante carga
                    />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"} {/* Mostrar estado de carga */}
                </Button>
            </div>
        </form>
    )
}