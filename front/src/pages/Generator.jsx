import { useState } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI SQL Generator</h1>

      <div className="mb-4 w-full max-w-xl">
        <label className="block text-sm font-medium mb-1">Select SQL Dialect:</label>
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="Oracle">Oracle</option>
          <option value="SQL Server">SQL Server</option>
        </select>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your natural language question..."
        className="w-full max-w-xl p-4 rounded-lg bg-gray-800 border border-gray-600 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold disabled:opacity-50 mb-6"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="w-full max-w-xl bg-gray-800 p-4 rounded-lg border border-gray-700 whitespace-pre-wrap">
          <h3 className="font-bold text-blue-400 mb-2">Generated SQL:</h3>
          <pre className="text-green-400">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default Generator;
