import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, BarChart2, Bug } from "lucide-react"; // Updated Icons
import zainab from "../assets/zainab.jpeg"; 
import aafreen from "../assets/aafreen.jpeg"; 
import sonia from "../assets/sonia.jpeg"; 

const teamMembers = [
  {
    name: "Zainab Owais",
    role: "Final year B.Voc. DSAA",
    image: zainab,
    bio: "Enjoys working with AI and making models better and faster.",
  },
  {
    name: "Aafreen Awez",
    role: "Final year B.Voc. DSAA",
    image: aafreen,
    bio: "Loves writing neat code and creating easy-to-use designs.",
  },
  {
    name: "Sonia S.",
    role: "Final year B.Voc. DSAA",
    image: sonia,
    bio: "Good at handling data and making sure queries run super fast.",
  },
];

const About = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : prev));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-blue-400">About Us</h1>
        <h3 className="mt-2 text-gray-300 text-lg">
          The brains behind AI-powered SQL magic! 🚀
        </h3>
      </motion.div>

      {/* Team Section */}
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center w-64"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400"
            />
            <h2 className="text-xl font-bold mt-3">{member.name}</h2>
            <p className="text-blue-400">{member.role}</p>
            <p className="text-gray-300 text-sm mt-2">{member.bio}</p>
          </motion.div>
        ))}
      </div>

      {/* Description Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2 }}
        className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-green-400">Objective</h2>
        <p className="text-gray-300 mt-4 text-lg">
        The objective of this AI-powered SQL chatbot and data visualization API is 
        to enable users to interact with SQL databases using natural language, generate and execute queries, 
        validate SQL syntax, and visualize query results. It integrates Google Gemini AI to convert user questions 
        into SQL queries dynamically, supports multiple SQL dialects, and ensures query correctness through
        AI-driven validation. The chatbot can connect to SQL Server, retrieve database schema, and
        execute queries while handling errors gracefully. Additionally, the API includes AI-powered 
        data visualization, allowing users to upload CSV/Excel files, generate graphs 
        (bar charts, line charts, scatter plots, etc.), and analyze trends. 
        By combining natural language processing (NLP), database interaction, and data visualization, 
        this project streamlines SQL-based data retrieval and analysis, making it more accessible to users
        with varying levels of SQL expertise.
        </p>
      </motion.div>

      {/* Features Section */}
      <h2 className="text-center text-3xl font-bold mt-12 text-green-400">Key Features</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {[
          { 
            icon: <Code size={32} className="text-blue-400" />, 
            title: "SQL Query Generation", 
            titleColor: "text-blue-400",
            desc: "Convert natural language input into optimized SQL queries instantly." 
          },
          { 
            icon: <BarChart2 size={32} className="text-yellow-400" />, 
            title: "Data Visualization", 
            titleColor: "text-yellow-400",
            desc: "Generate interactive charts and graphs from query results." 
          },
          { 
            icon: <Bug size={32} className="text-red-400" />, 
            title: "SQL Query Debugging", 
            titleColor: "text-red-400",
            desc: "Detect and fix SQL errors with AI-powered suggestions." 
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-gray-800 p-6 w-72 text-center rounded-xl shadow-lg"
          >
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className={`text-lg font-semibold mt-2 ${feature.titleColor}`}>
              {feature.title}
            </h3>
            <p className="text-gray-300 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
