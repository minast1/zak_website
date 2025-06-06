import HomeLayout from "@/components/home/home-layout";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Book = dynamic(() => import("@/components/home/book"), {
  ssr: false,
  //loading: () => <p>Loading...</p>,
});
export default async function MagazinePage() {
  //const bookRef = React.useRef(null);

  // useEffect(() => {
  //   if (bookRef.current) {
  //     // @ts-ignore
  //     console.log(bookRef.current?.style?.height);
  //   }
  // }, [bookRef]);

  return (
    <HomeLayout>
      {/* <main className="px-4 md:px-8 lg:px-48 py-10 grid gap-10 bg-black"> */}
      <div className="bg-black py-10">
        <Book file={`/issue_01.pdf`} />
        {/* <div className="flex flex-wrap justify-center gap-5 md:gap-10 mt-10">
          {[...Array(4)].map((_, i) => (
            <Card
              className="bg-white rounded-none w-[160px] border border-yellow-600"
              key={i}
            >
              <CardContent className="p-2">
                <div className="relative w-full h-[180px]">
                  <Image
                    src={`/img8.jpeg`}
                    alt="Image Thumbnails"
                    fill
                    // className="rounded-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
      {/* </main> */}
    </HomeLayout>
  );
}
