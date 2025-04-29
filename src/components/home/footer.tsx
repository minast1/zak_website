import React from "react";
import Fab from "./fab";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 md:px-8 lg:px-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center md:text-left">
      <div>
        <h2 className="text-2xl font-bold mb-2">SANKOFA SUSTAINABILITY</h2>
        <p className="text-sm text-gray-600">
          Global Entrepreneurship Summit 2025 in Nigeria, showcasing essential
          themes shaping the future of entrepreneurship globally.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          © 2025 Sankofa Sustainability. All Rights Reserved.
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
    </footer>
  );
};

export default Footer;
