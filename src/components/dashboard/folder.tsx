"use client";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { FcFolder } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Pencil, Tag, TrashIcon } from "lucide-react";
import { Magazine } from "@/lib/types/types";
import { FaFilePdf } from "react-icons/fa";
import { useAction } from "next-safe-action/hooks";
import { deleteMagazine } from "@/app/actions/magazines/magazine";
import { toast } from "sonner";

const Folder = ({ id, createdAt, coverImage, pdf }: Magazine) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { execute, status, result } = useAction(deleteMagazine, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success("Folder and its Contents Deleted Successfully", {
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
      });
    },
  });
  const extractedFileName = useMemo(() => {
    const parts = pdf.split("-");
    // Remove the first 5 parts which belong to the UUID
    const fileNameParts = parts.slice(5);
    return fileNameParts.join("-");
  }, [pdf]);
  return (
    <div className="max-w-sm">
      <ul>
        <li className="my-1.5">
          {isExpanded ? (
            <span className="flex items-center gap-1.5">
              <FcOpenedFolder
                size={70}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <FcFolder
                    size={70}
                    onClick={() => setIsExpanded(!isExpanded)}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {/* <ContextMenuLabel>Delete</ContextMenuLabel> */}
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => execute({ id })}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Move to Trash{" "}
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Tag className="mr-2 h-4 w-4" />
                    Assign Tags
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>

              {format(new Date(createdAt), "PPP")}
            </span>
          )}

          {isExpanded && (
            <ul className="pl-6">
              <li className="my-1 text-sm flex flex-col space-y-2">
                <FaFilePdf size={30} className="text-red-500" />
                <span className="flex items-center gap-1.5">
                  {extractedFileName}
                </span>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Folder;
