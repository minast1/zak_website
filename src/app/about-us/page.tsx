import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import HomeLayout from "@/components/home/home-layout";
import { fetchPosts } from "../actions/posts/post";
import AboutUsContent from "@/components/about-us/about-us";

export default async function AboutUsPage() {
  const posts = await fetchPosts();
  return (
    <HomeLayout>
      <AboutUsContent posts={posts} />
    </HomeLayout>
  );
}
