import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NotebookPen } from "lucide-react";
import { fetchTotalPosts } from "@/app/actions/posts/post";

export async function TotalPostsCard() {
  const totalPosts = await fetchTotalPosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Total Published Posts
        </CardTitle>
        <NotebookPen className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalPosts}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}

export default TotalPostsCard;
