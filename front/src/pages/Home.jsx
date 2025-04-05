import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background.mp4"; // Import the video
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {

  const [showSubBoxes, setShowSubBoxes] = useState(false);

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

      {/* Navbar - Placed at the top */}
      <Navbar />

      {/* Main Content - flex-grow ensures it takes remaining space */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-white relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
            Welcome to EchoSQL
          </h1>
        </div>

        {/* Introduction Section */}
<div className="mt-3 text-center max-w-4xl">
  <h3 className="text-lg text-white-300 opacity-0 animate-fadeInSlow">
  Where the Gemini API powers seamless SQL query generation and debugging, transforming your natural
   language requests into optimized code while fixing errors on the fly. Export your queries or results to
    Excel with ease and explore dynamic visualizations like charts and graphs for deeper insights—all designed 
    to simplify and enhance your database experience.
  </h3>
</div>


   
        {/* Feature Section */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
  {/* SQL Demo Box */}
{/* SQL Demo + Sub-Boxes Group */}
{/* SQL Demo + Sub-Boxes Group */}
<div className="flex flex-col items-center gap-4 w-full">
  {/* SQL Demo Box */}
  <div
    onClick={() => setShowSubBoxes((prev) => !prev)}
    className="cursor-pointer group w-full"
  >
    <div className="p-6 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/50">
      <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">
        SQL DEMO
      </h2>
      <p className="text-gray-400">Generate SQL queries from natural language.</p>
    </div>
  </div>

  {/* Sub-Boxes: Retriever and Generator */}
  {showSubBoxes && (
    <div className="flex flex-col w-full gap-4 transition-all duration-500 ease-in-out animate-fadeIn">
      {/* Retriever Box */}
      <Link to="/sql-demo" className="group transform transition-all duration-300 hover:scale-105">
        <div className="p-6 bg-gray-700/80 rounded-2xl shadow-lg border border-gray-600 hover:shadow-purple-500/50 opacity-0 animate-slideFadeIn animation-delay-200">
          <h3 className="text-xl font-semibold mb-1 group-hover:text-purple-400 transition">
            Fetching Data
          </h3>
          <p className="text-gray-300">Retrieve information intelligently.</p>
        </div>
      </Link>

      {/* Generator Box */}
      <Link to="/generator" className="group transform transition-all duration-300 hover:scale-105">
        <div className="p-6 bg-gray-700/80 rounded-2xl shadow-lg border border-gray-600 hover:shadow-green-500/50 opacity-0 animate-slideFadeIn animation-delay-300">
          <h3 className="text-xl font-semibold mb-1 group-hover:text-green-400 transition">
            Generate Queries
          </h3>
          <p className="text-gray-300">Generate any Database based language queries using AI.</p>
        </div>
      </Link>
    </div>
  )}
</div>




  {/* SQL Visualizer Box */}
  <Link to="/visualize" className="group">
    <div className="p-6 bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 hover:shadow-green-500/50">
      <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">
        SQL VISUALIZER
      </h2>
      <p className="text-gray-400">Visualize your SQL data in an interactive way.</p>
    </div>
  </Link>

  {/* SQL Debugger Box */}
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

      {/* Footer - Ensures it's at the bottom */}
      <Footer />
    </div>
  );
};

export default Home;
