"use client";
import { format } from "date-fns";
import React from "react";
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

const Folder = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
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
                  <ContextMenuItem>
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

              {format(new Date(), "PPP")}
            </span>
          )}

          {isExpanded && (
            <ul className="pl-6">
              <li className="my-1.5">
                <span className="flex items-center gap-1.5">
                  Items in the Magazine
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
