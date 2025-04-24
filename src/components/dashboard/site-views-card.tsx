import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, NotebookPen } from "lucide-react";
import { fetchTotalPosts } from "@/app/actions/posts/post";

export async function SiteViewsCard() {
  //const totalPosts = await fetchTotalPosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Site Views</CardTitle>
        <Eye className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
}

export default SiteViewsCard;
