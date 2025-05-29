import { Button } from "~/components/ui/button"

import type { Route } from "../+types/root"
import { Link } from "react-router"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (

    <div className="flex flex-1 flex-col overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Título de la página</h1>
      <p className="mb-4">Contenido extenso...</p>
      <Link to="/">
        <Button>Ir a Home</Button>
      </Link>
      {/* más contenido */}
    </div>
  )
}
