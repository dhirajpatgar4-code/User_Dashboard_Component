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

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

////////////////////////////////////////
//      Components & Page Imports     //
////////////////////////////////////////

import { Home, AdminLogin } from "./pages";
import { Navbar } from "./components";
import { useEffect } from "react";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin/login";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
