//import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { fetchPosts } from "@/app/actions/posts/post";
import { columns } from "@/components/dashboard/posts-table/columns";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { FaBook } from "react-icons/fa6";

export default async function HiddenDashbaordPage() {
  const posts = await fetchPosts();
  return (
    <main className="space-y-10">
      <div>
        <Card>
          <CardHeader className="px-6 border-b border-gray-200 py-4">
            <div className="flex gap-5 w-full">
              <Button asChild size={"sm"} className="gap-1 text-xs max-w-fit">
                <Link
                  href="/zachary-online/v1/dashboard/create"
                  prefetch={true}
                >
                  Create New Post
                  <EditIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size={"sm"} className="gap-1 text-xs max-w-fit">
                <Link
                  href="/zachary-online/v1/dashboard/magazines"
                  prefetch={true}
                >
                  Magazines
                  <FaBook className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <DataTable columns={columns} data={posts} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
