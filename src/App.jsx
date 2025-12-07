////////////////////////////////////////////////////////
//   THIS FILE FOLLOWS PROJECT STRUCTURE GUIDELINES   //
////////////////////////////////////////////////////////
//  IMPORTANT:
//  - This file serves as the central routing and layout handler.
//  - Do NOT modify, remove, or add routes, components, or logic
//    in this file unless you have been specifically assigned to do so.
//  - All structural changes must follow project conventions and
//    must be reviewed before merging.
//  - Unauthorized edits may break global navigation, imports, or
//    project-wide routing behavior.
//  - Treat this file as a protected core file within the project.
//
////////////////////////////////////////////////////////

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

////////////////////////////////////////
//      Components & Page Imports     //
////////////////////////////////////////

import { Home } from "./pages";
import { Navbar } from "./components";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
