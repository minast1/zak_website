import PostEditor from "@/components/dashboard/post-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const CreatePostPage = () => {
  return (
    <main className="space-y-10">
      <div>
        <Card>
          <CardHeader className="px-6 border-b border-gray-200 py-4 flex flex-row justify-between">
            <CardTitle className="font-bold text-xl text-gray-800">
              Create New Post
            </CardTitle>
            <Button size={"sm"} asChild className="max-w-fit">
              <Link href="/zachary-online/v1/dashboard">Back to Posts</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <PostEditor />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreatePostPage;
