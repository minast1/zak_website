//import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { fetchPosts } from "@/app/actions/posts/post";
import PostEditor from "@/components/dashboard/post-editor";
import { columns } from "@/components/dashboard/posts-table/columns";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { EditIcon } from "lucide-react";

export default async function HiddenDashbaordPage() {
  const posts = await fetchPosts();
  return (
    <main className="space-y-10">
      <div>
        <Card>
          <CardHeader className="px-6 border-b border-gray-200 py-4">
            <Button size={"sm"} className="gap-1 text-xs max-w-fit">
              Create New Post
              <EditIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="py-6">
            <DataTable columns={columns} data={posts} />
          </CardContent>
        </Card>
      </div>
      {/* <div>
        <Card className="shadow-xl">
          <CardHeader className="px-6 border-b border-gray-200 py-4">
            <CardTitle className="font-bold text-xl text-gray-800">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostEditor />
          </CardContent>
        </Card>
      </div> */}
    </main>
  );
}
