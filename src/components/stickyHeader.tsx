"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const StickyHeader: React.FC = () => {
  // Initially hidden so we can animate it falling down.
  const [visible, setVisible] = useState(false);
  // Track mobile menu open/close state.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Store previous scroll position to detect scroll direction.
  const prevScrollPos = useRef(0);

  // On mount, animate the header falling down.
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      // Close mobile menu on scroll
      if (isMenuOpen) setIsMenuOpen(false);

      // If scrolling up by at least 10px, show the header.
      if (currentScrollPos < prevScrollPos.current - 10) {
        setVisible(true);
      }
      // If scrolling down by at least 10px, hide the header.
      else if (currentScrollPos > prevScrollPos.current + 10) {
        setVisible(false);
      }
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className="fixed left-0 w-full z-50 bg-white transition-all duration-500 ease-in-out shadow-md"
      style={{ top: visible ? "0" : "-80px" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-5">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MK
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#gallary"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          {/* Desktop Button */}
          <button className="hidden md:block bg-black text-white px-4 py-2 rounded transition-colors duration-200">
            Get Started
          </button>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-4 text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="px-4 pt-2 pb-4 space-y-2">
            <li>
              <Link
                href="/"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#gallary"
                className="text-lg cursor-pointer text-gray-800 hover:text-gray-500"
              >
                Blog
              </Link>
            </li>
            <li>
              <button className="w-full bg-black text-white px-4 py-2 rounded transition-colors duration-200">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default StickyHeader;
