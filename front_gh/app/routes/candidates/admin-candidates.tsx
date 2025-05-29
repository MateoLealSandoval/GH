import { useState, useEffect } from "react"
import type { Route } from "../../+types/root"
import { getCandidates } from "~/providers/candidatesProvider"
import type { Candidate } from "~/models/payment"
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"
import { getMasterListByCode } from "~/providers/marterListProvider"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Administrar candidatos - Gestión Humana" },
    { name: "description", content: "Edita, elimina o agrega nuevos candidatos al sistema." },
  ]
}

export default function AdminCandidates() {

  const [data, setData] = useState<Candidate[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidates, seniorityList, englishLevels] = await Promise.all([
          getCandidates(),
          getMasterListByCode('seniority'),
          getMasterListByCode('nivelIngles'),
        ]);

        const dataCandidates = candidates.data.map((c: { seniority: any; nivelIngles: any }) => {
          const seniorityLabel = seniorityList.find((s: { value: string }) => s.value === String(c.seniority))?.label ?? 'No definido';
          const englishLabel = englishLevels.find((e: { value: string }) => e.value === String(c.nivelIngles))?.label ?? 'No definido';
          return {
            ...c,
            seniorityLabel,
            englishLabel,
          };
        });

        setData(dataCandidates)
      } catch (error) {
        console.error("Error al obtener candidatos:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-1 flex-col ">
      <div className="my-4 px-4 text-2xl font-bold text-center sm:text-left">
        Administrar candidatos
      </div>
      <div className=" px-4">
        <DataTable columns={columns} data={data} />
      </div>
      {/* más contenido */}
    </div>
  )

}
