import type { Route } from "../../+types/root"
import { Button } from "~/components/ui/button"
import { Link } from "react-router"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Administrar vacantes - Gestión Humana" },
    { name: "description", content: "Crea y modifica las vacantes disponibles en la organización." },
  ]
}

export default function Home() {
  return (

    <div className="flex flex-1 flex-col overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Admin Vacantes</h1>
      <p className="mb-4">Contenido extenso...</p>
      <Link to="/">
        <Button>Ir a Home</Button>
      </Link>
      {/* más contenido */}
    </div>
  )
}
