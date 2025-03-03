"use client"
import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="py-3 fixed top-0 w-full z-50 bg-white">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" >
            <picture  className="ml-2 md:ml-0">
              <img src="/Logo.png" alt="logo.png"/>
            </picture>
          </Link>

          {/* Hamburger Icon for smaller screens */}
          <div className="block md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl p-2"
            >
              <IoIosMenu />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`flex gap-[30px]  md:flex-col md:absolute md:left-0 md:right-0 md:bg-white md:top-16 md:w-full md:p-4 md:gap-6 md:transition-all md:duration-300 md:${isMenuOpen ? "top-0" : "-top-full"}`}
          >
            <Link href="#" className="group hover:text-[#8454F5]">
              Home
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
            <Link href="#" className="group hover:text-[#8454F5]">
              About
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
            <Link href="#" className="group hover:text-[#8454F5]">
              Service
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
            <Link href="#" className="group hover:text-[#8454F5]">
              Portfolio
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
            <Link href="#" className="group hover:text-[#8454F5]">
              Price
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
            <Link href="#" className="group hover:text-[#8454F5]">
              Blog
              <IoIosArrowDown className="inline group-hover:text-[#8454F5] group-hover:rotate-[180deg] transition-[.8s] ease-in" />
            </Link>
          </nav>

          {/* Contact Us Button */}
          <Link href="#" className="px-[28px] py-[14px] rounded-[18px] bg-[#8454F5] hidden md:inline-block">
            Contact Us
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
