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
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ user?: string; password?: string }>({})
    const [showPassword, setShowPassword] = useState(false)

    function validate() {
        const newErrors: typeof errors = {}
        if (!user.trim()) newErrors.user = "El usuario es requerido"
        if (!password) newErrors.password = "La contraseña es requerida"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        const result = await login(user, password);

        if (result.success) {
            console.log("Inicio de sesión exitoso");
            navigate("/dashboard")
        } else {
            console.log("Error de login:", result.error);
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Inicia sesión</h1>
            </div>
            <div className="grid gap-6">

                <div className="grid gap-2">
                    <Label htmlFor="user">Usuario</Label>
                    <Input id="user" type="text" value={user}
                        onChange={(e) => setUser(e.target.value)} required />
                    {errors.user && <p className="text-sm text-red-500">{errors.user}</p>}
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
                    <Input id="password" type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="flex items-center gap-2 ">
                    <Label className="text-sm font-normal">Mostrar contraseña</Label>
                    <Checkbox checked={showPassword}
                        onCheckedChange={(val) => setShowPassword(!!val)} />
                </div>
                <Button type="submit" className="w-full">
                    Iniciar sesión
                </Button>
            </div>
            {/* <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <a href="#" className="underline underline-offset-4">
                    Registrate
                </a>
            </div> */}
        </form>
    )
}
