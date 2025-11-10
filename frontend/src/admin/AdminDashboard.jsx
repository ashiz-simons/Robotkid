// src/admin/AdminDashboard.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import ProjectsAdmin from "./ProjectsAdmin";
import SkillsAdmin from "./SkillsAdmin";
import MessagesAdmin from "./MessagesAdmin";
import AboutAdmin from "./AboutAdmin";
import LoginAdmin from "./AdminLogin"; // optional

const requireAuth = () => !!localStorage.getItem("token");

const AdminDashboard = () => {
  if (!requireAuth()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAF8] text-gray-900">
      <aside className="w-72 bg-[#fff8f4] border-r border-red-100 p-6">
        <h2 className="text-2xl font-extrabold text-red-600 mb-6">Robotkid Admin</h2>
        <nav className="flex flex-col gap-3">
          <a href="/admin/projects" className="text-gray-700 hover:text-red-600">Projects</a>
          <a href="/admin/skills" className="text-gray-700 hover:text-red-600">Skills</a>
          <a href="/admin/messages" className="text-gray-700 hover:text-red-600">Messages</a>
          <a href="/admin/about" className="text-gray-700 hover:text-red-600">About</a>
        </nav>
      </aside>

      <div className="flex-1">
        <AdminNavbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<ProjectsAdmin />} />
            <Route path="/projects" element={<ProjectsAdmin />} />
            <Route path="/skills" element={<SkillsAdmin />} />
            <Route path="/messages" element={<MessagesAdmin />} />
            <Route path="/about" element={<AboutAdmin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
