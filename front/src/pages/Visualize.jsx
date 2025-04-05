import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Visualization = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dataPreview, setDataPreview] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [graphType, setGraphType] = useState("Bar Chart");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success messages

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Reset message on new file selection
  };

  const submitFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setColumns(response.data.columns);
      setDataPreview(response.data.preview);
      setXAxis(response.data.columns[0]);
      setYAxis(response.data.columns[1] || "");
      setMessage("File uploaded successfully!");
      setError("");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file. Please try again.");
    }
  };

  const generateGraph = async () => {
    if (!xAxis || !yAxis) {
      setError("Please select both X and Y axes.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/generate-graph", {
        data: dataPreview,
        x_axis: xAxis,
        y_axis: yAxis,
        chart_type: graphType,
      });
      setImage(`data:image/png;base64,${response.data.image}`);
      setError("");
    } catch (err) {
      console.error("Graph generation error:", err);
      setError("Failed to generate graph. Please check your selections.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <Navbar/>
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          AI-Powered Data Visualization
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <input 
            type="file" 
            accept=".csv, .xlsx" 
            onChange={handleFileUpload} 
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={submitFile} 
            className="w-full p-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        </div>

        {message && <p className="text-green-400 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {columns.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Select Graph Parameters</h3>
            <div className="flex flex-col space-y-0 md:flex-row md:space-x-4">
              <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400">
                {columns.map((col) => <option key={col} value={col}>{col}</option>)}
              </select>
              <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400">
                {columns.map((col) => <option key={col} value={col}>{col}</option>)}
              </select>
              <select value={graphType} onChange={(e) => setGraphType(e.target.value)} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400">
                <option>Bar Chart</option>
                <option>Line Chart</option>
                <option>Scatter Plot</option>
                <option>Pie Chart</option>
                <option>Histogram</option>
                <option>Box Plot</option>
              </select>
            </div>
            <button onClick={generateGraph} className="w-full p-3 bg-green-500 rounded-lg text-white font-bold hover:bg-green-600 transition duration-300">
              Generate Graph
            </button>
          </div>
        )}

        {dataPreview.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Data Preview</h4>
            <div className="overflow-x-auto">
              <table className="w-full mt-2 border border-gray-700 rounded-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>{columns.map((col) => <th key={col} className="p-3 border border-gray-600 text-left">{col}</th>)}</tr>
                </thead>
                <tbody>
                  {dataPreview.slice(0, 5).map((row, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition duration-300">
                      {columns.map((col) => <td key={col} className="p-3 border border-gray-700">{row[col]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {image && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Generated Graph</h3>
            <img src={image} alt="Generated Graph" className="w-full rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;
