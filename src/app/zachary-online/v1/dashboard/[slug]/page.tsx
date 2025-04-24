//import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { fetchPostBySlug } from "@/app/actions/posts/post";
import EditPostForm from "@/components/dashboard/edit-post-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditIcon } from "lucide-react";
import Link from "next/link";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  // console.log(post);
  return (
    <main className="space-y-10">
      <div>
        <Card>
          <CardHeader className="px-6 border-b border-gray-200 py-4 flex flex-row justify-between">
            <CardTitle className="font-bold text-xl text-gray-800 flex items-center gap-2 flex-1">
              Edit Post <EditIcon className="h-4 w-4" />
            </CardTitle>
            <Button size={"sm"} asChild className="max-w-fit">
              <Link href="/zachary-online/v1/dashboard">Back to Posts</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <EditPostForm
              id={slug}
              title={post.title}
              post={post.content}
              label={post.label}
              tags={post.tags}
              extFile={post.image}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
