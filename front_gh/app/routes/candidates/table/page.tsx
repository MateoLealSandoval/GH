// "use client"

// import type { Payment } from "~/models/payment"
// import { columns } from "./columns"
// import { DataTable } from "./data-table"

// async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//         },
//         // ...
//     ]
// }

// export default async function DemoPage() {
//     const data = await getData()

//     return (
//         <div className="container mx-auto py-10">
//             <DataTable columns={columns} data={data} />
//         </div>
//     )
// }
// "use client"

// import { useEffect, useState } from "react"
// import type { Payment } from "~/models/payment"
// import { columns } from "./columns"
// import { DataTable } from "./data-table"

// function getData(): Promise<Payment[]> {
//     // Simula fetch API
//     return Promise.resolve([
//         {
//             id: "728ed52f",
//             amount: 1020,
//             status: "pending",
//             email: "m@example.com",
//         },
//     ])
// }

// export default function DemoPage() {
//     const [data, setData] = useState<Payment[]>([])

//     useEffect(() => {
//         getData().then(setData).catch(console.error)
//     }, [])

//     return (
//         <div className="container mx-auto py-10">
//             <DataTable columns={columns} data={data} />
//         </div>
//     )
// }
