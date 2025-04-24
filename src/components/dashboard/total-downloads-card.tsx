import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, HardDriveDownload, NotebookPen } from "lucide-react";
import { fetchTotalPosts } from "@/app/actions/posts/post";

export async function TotalDownloadsCard() {
  //const totalPosts = await fetchTotalPosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
        <HardDriveDownload className="w-4 h-4 text-muted-foreground font-semibold" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">+201 since last hour</p>
      </CardContent>
    </Card>
  );
}

export default TotalDownloadsCard;
