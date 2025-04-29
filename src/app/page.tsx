import FlipBookWrapper from "@/components/home/book";
import HomeLayout from "@/components/home/home-layout";
import MainContent from "@/components/home/main-content";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <HomeLayout>
      <MainContent />
    </HomeLayout>
  );
}
