import { useState } from "react";
import Navbar from "../components/Navbar"; // Assuming you want the same Navbar as Sql.jsx

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialect, setDialect] = useState("MySQL");

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://localhost:5000/display", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: prompt,
          dialect,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setOutput(`❌ Error: ${data.error}`);
      } else {
        setOutput(data.sql);
      }
    } catch (error) {
      setOutput("❌ Error generating SQL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <Navbar />
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          AI SQL Generator
        </h1>

        {/* Dialect Selector */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Select SQL Dialect:</label>
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            <option value="MySQL">MySQL</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="Oracle">Oracle</option>
            <option value="SQL Server">SQL Server</option>
          </select>
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Your Question:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your natural language question..."
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
            rows={2}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full p-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin inline-block w-5 h-5 border-t-2 border-white rounded-full"></span>
          ) : (
            "Generate SQL"
          )}
        </button>

        {/* Output Section */}
        {output && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Generated SQL:</h3>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
