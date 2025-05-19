"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Post } from "@/lib/types/types";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type TProps = {
  posts: Post[];
};
const MainContent = ({ posts }: TProps) => {
  return (
    <main className="px-4 md:px-8 lg:px-48 py-10 grid gap-10 md:grid-cols-2 bg-black">
      {/* Left Column - Magazine Cover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-5"
      >
        <Card className="bg-white rounded-none w-full">
          <CardContent className="flex flex-col sm:flex-row w-full p-3">
            <div className="relative h-[500px] w-full md:h-[700px]">
              <Image
                src="/imgs/img7.jpeg"
                alt="Magazine Cover"
                fill
                className="rounded-none shadow-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          size={"sm"}
          asChild
          className="bg-white text-black font-semibold w-fit-content hover:bg-gray/30"
        >
          <Link href="/magazine">Read Online</Link>
        </Button>
      </motion.div>

      {/* Right Column - News Highlights */}
      <div className="flex flex-col gap-8">
        <div className="w-full border-b-2 border-blue-600">
          <div className="w-36 px-5 h-10 bg-blue-600 clip-slant-right font-semibold text-white flex items-center">
            Recent Posts
          </div>
        </div>
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 + i * 0.2 }}
          >
            <Card className="bg-black text-gray-400 border-none">
              <CardContent className="flex flex-col sm:flex-row gap-4 p-2 ">
                <div className="md:h-40 lg:h-40 flex-shrink-0 sm:w-40 h-[340px] relative">
                  <Image
                    //src={`https://storage.googleapis.com/posts/${post.image}`}
                    src={`/posts/${
                      i == 0 ? "politics.jpeg" : i == 1 ? "FDA.jpg" : "ecg.jpeg"
                    }`}
                    alt={`image_${post.id}`}
                    fill
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mt-1 leading-tight text-white">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Reporter Name - News Source
                  </p>
                  <div
                    className="text-xs line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 text-xs w-fit-content border-gray-600 text-black dark:text-white p-1 h-6 hover:bg-lime-400 hover:text-black"
                  >
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
