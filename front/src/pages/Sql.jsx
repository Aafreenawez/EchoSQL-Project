import { useState } from "react";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Sql = () => {
  const [server, setServer] = useState("");
  const [database, setDatabase] = useState("");
  const [dialect, setDialect] = useState("SQL Server");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server, database, dialect, question }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }

    setLoading(false);
  };

  const downloadExcel = () => {
    if (!response || !response.result || !response.result.rows) return;

    const { columns, rows } = response.result;

    const formattedData = rows.map((row) =>
      Object.fromEntries(columns.map((col, index) => [col, row[index]]))
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "query_results.xlsx");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <Navbar />
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          EchoSQL
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">SQL Server Name:</label>
            <input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Database Name:</label>
            <input
              type="text"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">SQL Dialect:</label>
            <div className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600">
              SQL Server
            </div>
          </div>

          <div>
            <label className="block text-gray-300">Your Question:</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-t-2 border-white rounded-full"></span>
            ) : (
              "Generate SQL"
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Response Section */}
        {response && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400">
              Generated SQL Query:
            </h2>
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg mt-2">
              {response.query}
            </pre>

            {/* Query Results */}
            {response.result && response.result.rows && (
              <div className="mt-4">
                <h3 className="text-lg font-bold text-green-400">
                  Query Results:
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full mt-2 border border-gray-700 rounded-lg">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        {response.result.columns.map((col, index) => (
                          <th
                            key={index}
                            className="p-3 border border-gray-600 text-left"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {response.result.rows.map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-800 transition duration-300"
                        >
                          {row.map((value, idx) => (
                            <td
                              key={idx}
                              className="p-3 border border-gray-700"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Download Excel Button */}
                <button
                  onClick={downloadExcel}
                  className="mt-4 p-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition duration-300"
                >
                  Download Excel
                </button>
              </div>
            )}

            {/* Message for non-SELECT queries (INSERT/DELETE/UPDATE) */}
            {response.result && response.result.message && (
              <div className="mt-4 p-3 bg-green-800 text-white rounded-lg font-medium">
                {response.result.message}
              </div>
            )}

            {/* Fallback if no rows and no message */}
            {response.result && !response.result.rows && !response.result.message && (
              <p className="mt-4 text-yellow-400">No data returned from the query.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sql;
