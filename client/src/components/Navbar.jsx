import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for Login and Verify Certificate
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll for smooth scrolling

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-sky-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="text-green-700 text-2xl font-bold cursor-pointer"
        >
          Green Earth Mission
        </ScrollLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-800">
          <li>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="hover:text-green-600 cursor-pointer"
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-green-600 cursor-pointer"
            >
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="programs"
              smooth={true}
              duration={500}
              className="hover:text-green-600 cursor-pointer"
            >
              Programs
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="hover:text-green-600 cursor-pointer"
            >
              Contact
            </ScrollLink>
          </li>
          {/* Use react-router-dom Link for the login page */}
          <li>
            <Link to="/login" className="hover:text-green-600 cursor-pointer">
              Login
            </Link>
          </li>
          {/* Use react-router-dom Link for the Verify Certificate page */}
          <li>
            <Link
              to="/verify"
              className="hover:text-green-600 cursor-pointer"
            >
              Verify Certificate
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-green-600">
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
          <div className="bg-white w-3/4 h-full p-6 flex flex-col space-y-6">
            <button
              onClick={toggleMenu}
              className="text-right text-2xl text-green-600"
            >
              X
            </button>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              About
            </ScrollLink>
            <ScrollLink
              to="programs"
              smooth={true}
              duration={500}
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              Programs
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              Contact
            </ScrollLink>
            {/* Use react-router-dom Link for the login page */}
            <Link
              to="/login"
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              Login
            </Link>
            {/* Use react-router-dom Link for Verify Certificate page */}
            <Link
              to="/verify"
              className="text-xl font-semibold text-green-700"
              onClick={toggleMenu}
            >
              Verify Certificate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
