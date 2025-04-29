"use client";
import Book from "@/components/home/book";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect } from "react";

export default function MagazinePage() {
  const bookRef = React.useRef(null);

  useEffect(() => {
    if (bookRef.current) {
      // @ts-ignore
      console.log(bookRef.current?.style?.height);
    }
  }, [bookRef]);

  return (
    <main className="px-4 md:px-8 lg:px-48 py-10 grid gap-10 bg-black">
      <div className="flex flex-col items-center gap-10">
        <Book ref={bookRef} />
        <div className="grid grid-cols-4 gap-10 items-stretch">
          {[...Array(4)].map((_, i) => (
            <Card className="bg-white rounded-none w-full" key={i}>
              <CardContent className="w-full p-3">
                <div className="relative h-[180px] w-[130px]">
                  <Image
                    src={`/imgs/img4.jpeg`}
                    alt="Image Thumbnails"
                    fill
                    className="rounded-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
