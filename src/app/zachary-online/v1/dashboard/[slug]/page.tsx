//import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { fetchPostBySlug } from "@/app/actions/posts/post";
import EditPostForm from "@/components/dashboard/edit-post-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EditIcon } from "lucide-react";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  console.log(post);
  return (
    <main className="space-y-10">
      <div>
        <Card className="shadow-xl">
          <CardHeader className="px-6 border-b border-gray-200 py-4">
            <CardTitle className="font-bold text-xl text-gray-800 flex items-center gap-2">
              Edit Post <EditIcon className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EditPostForm
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
