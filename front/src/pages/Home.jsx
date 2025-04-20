import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4"; // Import the video
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TypingParagraph = () => {
  const fullText =
    "Where the Gemini API powers seamless SQL query generation and debugging, transforming your natural language requests into optimized code while fixing errors on the fly. Export your queries or results to Excel with ease and explore dynamic visualizations like charts and graphs for deeper insights— all designed to simplify and enhance your database experience.";

  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 35); // typing speed in ms
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="mt-3 text-center max-w-4xl mx-auto">
      <h3 className="text-lg text-white text-opacity-90">
        {typedText}
        {index < fullText.length && (
          <span className="animate-pulse text-blue-400">|</span>
        )}
      </h3>
    </div>
  );
};

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />

      {/* Overlay to improve text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-white relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
  Welcome to <span className="text-blue-400">EchoSQL</span>
</h1>
        </div>

        {/* Introduction Section with Typing Effect */}
        <TypingParagraph />

        {/* Feature Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* SQL DEMO Box (Triggers Modal) */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div
              onClick={() => setShowModal(true)}
              className="cursor-pointer group w-full"
            >
              <div className="p-6 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/50">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">
                  QUERY BOT
                </h2>
                <p className="text-gray-400">Generate SQL queries from natural language.</p>
              </div>
            </div>
          </div>

          {/* SQL VISUALIZER Box */}
          <Link to="/visualize" className="group">
            <div className="p-6 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-green-500/50">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">
                SQL VISUALIZER
              </h2>
              <p className="text-gray-400">Visualize your SQL data in an interactive way.</p>
            </div>
          </Link>

          {/* SQL DEBUGGER Box */}
          <Link to="/debug" className="group">
            <div className="p-6 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-red-500/50">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition">
                SQL DEBUGGER
              </h2>
              <p className="text-gray-400">Debug your SQL codes and get suggestions.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Modal for SQL DEMO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white/10 border border-gray-500 rounded-2xl shadow-4xl p-8 w-[90%] max-w-2xl text-center relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-white text-2xl hover:text-red-400 transition"
            >
              &times;
            </button>


            {/* Options Side-by-Side */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Fetching Data */}
              <Link
                to="/sql-demo"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl px-6 py-5 transition transform hover:scale-105 backdrop-blur-md bg-white/10 border border-purple-300/30 text-white shadow-lg hover:shadow-purple-400/40"
              >
                <h3 className="text-xl font-bold mb-1">QUERY SYNC</h3>
                <p className="text-sm text-gray-200">Retrieves data insights from your database.</p>
              </Link>

              {/* Generate Queries */}
              <Link
                to="/generator"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl px-6 py-5 transition transform hover:scale-105 backdrop-blur-md bg-white/10 border border-green-300/30 text-white shadow-lg hover:shadow-green-400/40"
              >
                <h3 className="text-xl font-bold mb-1">SQL DIALECTS</h3>
                <p className="text-sm text-gray-200">Gives SQL queries specific to different databases.</p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
