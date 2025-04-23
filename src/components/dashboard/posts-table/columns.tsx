"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentData } from "firebase-admin/firestore";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<DocumentData>[] = [
  {
    id: "select",
    maxSize: 10,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    minSize: 400,
  },
  {
    accessorKey: "createdAt",
    header: "Published",
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("createdAt")), "PPPP");
      return <div>{date}</div>;
    },
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-1 items-center justify-center">
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-full bg-gray-100"
            asChild
          >
            <Link href={`/zachary-online/v1/dashboard/${id}`} prefetch={true}>
              <EditIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
