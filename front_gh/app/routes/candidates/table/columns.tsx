import type { ColumnDef } from "@tanstack/react-table"
import type { Candidate } from "~/models/payment"


export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "nombre",
    header: "Nombres",
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "aspiracionSalarial",
    header: "aspiracionSalarial",
  },
  {
    accessorKey: "aniosExperiencia",
    header: "aniosExperiencia",
  },
  {
    accessorKey: "seniorityLabel",
    header: "seniority",
  },
  {
    accessorKey: "englishLabel",
    header: "nivelIngles",
  },
  {
    accessorKey: "calificacion",
    header: "calificacion",
  },
  // {
  //   accessorKey: "habilidades",
  //   header: "habilidades",
  // },
  {
    id: "search",
    accessorFn: (row: any) => {
      return Object.values(row).join(" ").toLowerCase();
    },
    header: () => null,
    cell: () => null,
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,
  }
];