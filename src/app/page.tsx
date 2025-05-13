import FlipBookWrapper from "@/components/home/book";
import HomeLayout from "@/components/home/home-layout";
import MainContent from "@/components/home/main-content";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "./actions/posts/post";

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <HomeLayout>
      <MainContent posts={posts} />
    </HomeLayout>
  );
}
