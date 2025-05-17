"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Post } from "@/lib/types/types";
import DOMPurify from "isomorphic-dompurify";

const teamMembers = [
  {
    name: "Ama Kofi",
    role: "Founder & Director",
    image: "/images/ama-kofi.jpg",
    bio: "Ama leads with a passion for environmental justice and cultural sustainability. With roots in both urban agriculture and policy, she bridges grassroots action and systemic change.",
    social: {
      twitter: "https://twitter.com/ama_kofi",
      linkedin: "https://linkedin.com/in/amakofi",
      instagram: "https://instagram.com/ama.kofi",
    },
  },
  {
    name: "Kwame Mensah",
    role: "Education Coordinator",
    image: "/images/kwame-mensah.jpg",
    bio: "Kwame designs and delivers workshops for youth and adults, focusing on indigenous knowledge, climate science, and hands-on learning.",
    social: {
      twitter: "https://twitter.com/kwamemensah",
      linkedin: "https://linkedin.com/in/kwamemensah",
      instagram: "https://instagram.com/kwame.mensah",
    },
  },
  {
    name: "Nia Johnson",
    role: "Community Outreach Lead",
    image: "/images/nia-johnson.jpg",
    bio: "Nia connects our work to the community, building relationships with local partners and organizing impactful events.",
    social: {
      twitter: "https://twitter.com/niajohnson",
      linkedin: "https://linkedin.com/in/niajohnson",
      instagram: "https://instagram.com/nia.johnson",
    },
  },
];

type TProps = {
  posts: Post[];
};

const AboutUsContent = ({ posts }: TProps) => {
  return (
    <main className="px-4 md:px-8 lg:px-48 py-10 grid gap-10 md:grid-cols-3 bg-black">
      {/* Left Column - Magazine Cover */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-5 col-span-2"
      >
        <Card className="bg-black rounded-none w-full border-none">
          <CardContent className="flex flex-col space-y-8 text-white w-full p-3 bg-black">
            <div className="font-bold text-3xl">ABOUT US</div>
            <div>
              We are a full-service publishing and broadcasting company that
              focuses on issues of human development. This vision is reflected
              essentially in our flagship publication, Development Agenda. This
              magazine aims to be the most authoritative publication across West
              Africa on issues of development, especially as they relate to
              environment and natural resources management as well as social
              justice.
            </div>
            <div>
              We think strategically, then turn strategies into actions that
              deliver core messages to target audiences via any platform—from
              digital to traditional. An agency with a client-base that trusts
              us to deliver, Classmasters Ltd is your indispensable partner in
              development.
            </div>
            <div>
              Classmasters Limited was incorporated in 2016. We’ve been in
              business since then. However, we can trace our history back to
              2009, with our CEO co-owning MediaXtra Limited and subsequently
              working as the West Africa Communication and Campaigns Coordinator
              for the international relief and development agency, Oxfam. He has
              also headed Communications in other organizations including
              reputable financial institutions including Premium Pension Limited
              and First Guarantee Pension Limited as well as being the
              Communications Manager of the Nigerian Conservation Foundation
              (NCF) and the Africa Communication Officer of the World Wide Fund
              for Nature (WWF).
            </div>
            <div>
              <h2 className="text-3xl font-bold mt-10 mb-6 text-center">
                Meet Our Team
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                  >
                    <div className="relative w-full h-64 bg-black">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Column - News Highlights */}
      <div className="flex flex-col gap-8 col-span-2 md:col-span-1">
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
              <CardContent className="flex flex-col sm:flex-row gap-4 p-2 pb-5 border-b border-b-gray-500">
                <div className="md:h-40 flex-shrink-0 w-full sm:w-32 h-[300px]  relative">
                  <Image
                    //src={`https://storage.googleapis.com/posts/${post.image}`}
                    src={"/img8.jpeg"}
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
                    className="text-xs line-clamp-5"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default AboutUsContent;
