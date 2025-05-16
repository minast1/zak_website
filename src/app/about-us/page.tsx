"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import HomeLayout from "@/components/home/home-layout";

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

const AboutUsPage = () => {
  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto p-6">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        <Separator className="my-6" />

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">
                Development Agenda Nigeria is committed to promoting sustainable
                development through strategic initiatives, policy advocacy, and
                community engagement. Our mission is to empower communities and
                drive progress towards achieving the Sustainable Development
                Goals (SDGs) in Nigeria.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
              <p className="text-muted-foreground">
                Our vision is to be a leading organization in driving
                sustainable development in Nigeria, fostering inclusive growth,
                and enhancing the quality of life for all citizens through
                effective programs and partnerships.
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-semibold mt-10 mb-6 text-center">
              Meet Our Team
            </h2>
            {/* <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <div className="relative w-full h-64">
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
            </div> */}
          </div>
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default AboutUsPage;
