import type { Route } from "../../+types/root"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Candidatos - Gestión Humana" },
    { name: "description", content: "Visualiza y gestiona los candidatos registrados en el sistema." },
  ]
}

export default function Candidates() {
  return (

    <div className="flex flex-1 flex-col overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Candidatos</h1>
      <p className="mb-4">Contenido extenso...</p>
      <Link to="/">
        <Button>Ir a Home</Button>
      </Link>
      {/* más contenido */}
    </div>
  )
}
