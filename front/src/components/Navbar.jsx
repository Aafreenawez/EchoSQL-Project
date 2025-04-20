import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon for mobile menu
import logo from "../assets/logo.png"; // Import the image from assets

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-700/30 backdrop-blur-lg text-white px-6 py-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Image */}
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Spinning logo on hover */}
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
          />
          <span className="text-2xl font-bold text-blue-400">EchoSQL</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 bg-gray-800/50 backdrop-blur-xl p-4 rounded-lg space-y-3">
          <li><Link to="/" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
