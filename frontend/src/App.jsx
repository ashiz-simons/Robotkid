// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contacts from "./components/Contact";

import AdminDashboard from "./admin/AdminDashboard";
import LoginAdmin from "./admin/AdminLogin"; // ✅ add this import

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contacts />
            </>
          }
        />

        {/* ✅ Admin Login Route */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* ✅ Protected Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
