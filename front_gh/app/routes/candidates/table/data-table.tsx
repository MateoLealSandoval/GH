import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, ArrowUpDownIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        filterFromLeafRows: true,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            const value = row.getValue("search") as string;
            return value.toLowerCase().includes(filterValue.toLowerCase());
        },

    })

    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
                <div className="flex w-full gap-2">
                    <Input
                        placeholder="Busca cualquier campo..."
                        value={globalFilter}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value)
                        }}
                        className="w-full md:max-w-sm"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    {/* {actions} */}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0 "
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </Button>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </div>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center ">
                    <p className="mr-2 text-sm font-medium">Filas por página</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value: string) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
