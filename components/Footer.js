import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
function Footer() {
  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-300">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
            href="/"
          >
            <span className="ml-3 text-xl">Pongdo</span>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Pongdo —
            <a
              href="https://sakshyamhere.netlify.app"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @Sakshyamhere
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://github.com/Sakshyamhere">
              <FaGithub className="text-2xl mx-2" />
            </a>
            <a href="https://www.linkedin.com/in/sakshyam-aryal-587603262/">
              <FaLinkedinIn className="text-2xl mx-2" />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
