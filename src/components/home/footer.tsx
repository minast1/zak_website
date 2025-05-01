import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 md:px-8 lg:px-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center md:text-left">
      <div className="flex flex-col">
        <div className="w-full h-32 md:h-28 relative">
          <Image
            src={`/grey_logo.png`}
            alt="Grey Logo"
            fill
            // className="rounded-none"
          />
        </div>
        <p className="text-xs text-gray-400">
          {`copyright © ${new Date().getFullYear()} Sankofa Sustainability. All Rights Reserved.`}
        </p>
      </div>
      <div className="flex items-center w-full">
        <p className="text-sm text-gray-500">
          Global Entrepreneurship Summit 2025 in Nigeria, a unique platform that
          will showcasing essential themes shaping the future of
          entrepreneurship on a global scale.
        </p>
      </div>
      <div className="text-gray-600">
        <h3 className="text-lg  font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="#" className="hover:text-lime-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Timetable
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Speakers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Gallery
            </a>
          </li>
        </ul>
      </div>
      {/* </div>
     
       */}
    </footer>
  );
};

export default Footer;
