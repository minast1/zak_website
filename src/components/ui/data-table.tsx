"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname } from "next/navigation";
import { DataTablePagination } from "../dashboard/posts-table/pagination";
import DebouncedSearchInput from "../dashboard/posts-table/debounced-searchinput";
import { Button } from "./button";
import { Trash2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFilterState = ColumnFilter[];
const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateColumnFilters, setDateColumnFilters] = useState<ColumnFilterState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    //enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setDateColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters: dateColumnFilters,
      globalFilter,
      rowSelection,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <div className="pb-4 flex items-center justify-between">
        <DebouncedSearchInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(value)}
          placeholder="Search Posts..."
        />
        {table.getSelectedRowModel().rows.length > 0 && (
          <Button size={"sm"} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected Rows
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className=" font-semibold text-black"
                    style={{ width: header.column.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex flex-col ">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <DateInput column={header.column} />
                        ) : null} */}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="odd:bg-white even:bg-gray-200"
                  //data-state={row.getIsSelected}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="sm:table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <div className="w-full pt-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;
