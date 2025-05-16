import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Folder from "@/components/dashboard/folder";

const MagazinesPage = () => {
  return (
    <main className="space-y-10">
      <div>
        <div className="flex w-full items-center gap-5">
          <Button size={"sm"} asChild className="max-w-fit">
            <Link href="/zachary-online/v1/dashboard">Back to Posts</Link>
          </Button>
          <Button
            size={"sm"}
            asChild
            className="max-w-fit bg-blue-400 hover:bg-blue-500 text-white"
          >
            <Link href="/zachary-online/v1/dashboard/magazines/create">
              Create New
            </Link>
          </Button>
        </div>

        <Card className="mt-5">
          {/* <CardHeader className="px-6 border-b border-gray-200 py-4 flex flex-row justify-between">
            <CardTitle className="font-bold text-xl text-gray-800">
              Create New Post
            </CardTitle>
          
          </CardHeader> */}
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <Folder key={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MagazinesPage;
