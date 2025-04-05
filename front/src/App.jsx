import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sql from "./pages/Sql";
import About from "./pages/About";
import Visualize from "./pages/Visualize";
import Contact from "./pages/Contact";
import Debug from "./pages/Debug";
import Generator from "./pages/Generator";


function App() {
  return (
    <Router>
      {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sql-demo" element={<Sql />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/about" element={<About/>} />
        <Route path="/visualize" element={<Visualize/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/debug" element={<Debug/>}/>

      </Routes>
      
    </Router>
  );
}

export default App;
