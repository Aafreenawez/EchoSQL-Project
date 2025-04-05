import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react"; // Social Icons

const Footer = () => {
  return (
    <footer className="relative bg-gray-700/30 backdrop-blur-lg text-white py-10 px-6 mt-12 overflow-hidden">
      {/* Gradient Border Animation */}
      <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 animate-[pulse_3s_infinite]"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row justify-between">
        {/* Left - Logo & Copyright */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-extrabold text-blue-400 tracking-wide">
            EchoSQL
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        {/* Center - Quick Navigation Links */}
        <ul className="flex space-x-6 text-gray-400 text-sm uppercase font-semibold">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-400 transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right - Social Media Icons */}
        <div className="flex space-x-5 mt-6 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <Facebook size={29} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <Twitter size={29} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <Linkedin size={29} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <Github size={29} />
          </a>
        </div>
      </div>


      {/* Glow Effect */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
    </footer>
  );
};

export default Footer;
