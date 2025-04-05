import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Debug = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateQuery = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/validate-query", {
        query: query,
        dialect: "SQL Server",
      });

      if (res.data.error) {
        setError(res.data.error);
      } else {
        setResponse(res.data);
      }
    } catch (err) {
      setError("Failed to validate query.");
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <Navbar />
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          SQL Debugger
        </h1>

        {/* Input Form */}
        <div className="space-y-4">
          <label className="block text-gray-300">Enter SQL Query:</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your SQL query..."
            rows={5}
          />

          <button
            onClick={validateQuery}
            className="w-full p-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-t-2 border-white rounded-full"></span>
            ) : (
              "Validate Query"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Response Section */}
        {response && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400">Correction</h2>
            
            <p className="text-gray-300"><strong>Original Query:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg mt-2">
              {query}
            </pre>

            <p className="text-gray-300"><strong>Fixed Query:</strong></p>
            <pre className="bg-gray-800 text-yellow-400 p-3 rounded-lg mt-2">
              {response.correction}
            </pre>

            <p className="text-gray-300"><strong>Explanation:</strong></p>
            <div className="bg-gray-800 text-white p-3 rounded-lg mt-2 max-h-60 overflow-y-auto">
              <ul className="list pl-5">
                {response.explanation.split("\n").map((line, index) => (
                  <li key={index} className="mb-2">{line}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Debug;
