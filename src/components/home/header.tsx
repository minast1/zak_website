"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

const links: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "News",
    href: "#",
  },
  {
    name: "Magazine",
    href: "/magazine",
  },
  {
    name: "About Us",
    href: "#",
  },
  {
    name: "Contact Us",
    href: "#",
  },
];
const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-black mt-1 flex flex-col items-center py-6 space-y-1 text-center px-4 md:px-8 lg:px-16 shadow-md">
      <div className="w-full flex justify-center items-center">
        {/* <p className="text-xs tracking-widest uppercase font-semibold">
          ESG | Climate Action | Environmental Sustainability
        </p> */}
        <div className="relative w-full md:w-3/5 h-44 md:h-48">
          <Image
            src={`/white_logo.png`}
            alt="White Logo"
            fill
            // className="rounded-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 mt-6 text-sm md:text-base font-seimibold">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={
              clsx(pathname === link.href && "text-lime-600 font-semibold") ||
              ""
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
