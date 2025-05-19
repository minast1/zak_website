import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Folder from "@/components/dashboard/folder";
import { fetchMagazines } from "@/app/actions/magazines/magazine";
import { FaRegFolderOpen } from "react-icons/fa";
import { Magazine } from "@/lib/types/types";
import { FcOpenedFolder } from "react-icons/fc";

export default async function MagazinesPage() {
  const magazines = await fetchMagazines();
  return (
    <main className="space-y-10">
      <div>
        <div className="flex w-full items-center gap-5">
          <Button size={"sm"} asChild className="max-w-fit shadow-xl">
            <Link href="/zachary-online/v1/dashboard">Back to Posts</Link>
          </Button>
          <Button size={"sm"} asChild className="max-w-fit shadow-xl">
            <Link href="/zachary-online/v1/dashboard/magazines/create">
              Add New Magazine
            </Link>
          </Button>
        </div>

        <Card className="mt-5 shadow-lg">
          {/* <CardHeader className="px-6 border-b border-gray-200 py-4 flex flex-row justify-between">
            <CardTitle className="font-bold text-xl text-gray-800">
              Create New Post
            </CardTitle>
          
          </CardHeader> */}
          <CardContent className="min-h-96">
            {magazines.length > 0 ? (
              <div className="grid grid-cols-5 gap-1">
                {magazines.map((magazine, i) => (
                  <Folder key={magazine.id} {...magazine} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col w-full h-96 space-y-2">
                <FcOpenedFolder
                  className="h-20 w-20 text-gray-400 stroke-custom"
                  strokeWidth={0.1}
                />
                <p className="text-slate-400">No Magazines Published Yet</p>
                <Button
                  size={"sm"}
                  asChild
                  className="max-w-fit shadow-xl bg-blue-400 text-white hover:bg-blue-500"
                >
                  <Link href="/zachary-online/v1/dashboard/magazines/create">
                    Add New Magazine
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
