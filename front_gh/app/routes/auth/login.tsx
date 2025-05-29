import type { Route } from "../../+types/root"
import { LoginForm } from "~/components/auth/login-form";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Inicio de sesión - Gestión Humana" },
    {
      name: "description",
      content: "Accede al portal de Gestión Humana para administrar tu información personal y laboral.",
    },
  ];
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              <img src="favicon.ico" alt="Logo"  className="size-6"/>
            </div>
            Iconoi
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
