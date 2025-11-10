// src/admin/AdminNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#FAFAF8]/80 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-red-600">Admin Panel</h3>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-700 hover:text-red-600"
        >
          View Site
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
