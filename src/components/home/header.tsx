"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
    name: "Read Online",
    href: "/read-online",
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
    <header className="sticky top-0 z-50 bg-black mt-1 flex flex-col items-center py-6 space-y-2 text-center px-4 md:px-8 lg:px-16 shadow-md">
      <div className="w-full flex justify-center items-center">
        <p className="text-xs tracking-widest uppercase font-semibold">
          ESG | Climate Action | Environmental Sustainability
        </p>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold">
        SANKOFA
        <span className="block text-lime-400">SUSTAINABILITY</span>
      </h1>
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
        {/* <a href="#" className={"text-lime-600 font-semibold"}>
          Home
        </a>
        <Link href="#">News</Link>
        <Link href="#">Read Online</Link>
        <Link href="#">About Us</Link>
        <Link href="#">Contact Us</Link> */}
      </nav>
    </header>
  );
};

export default Header;
