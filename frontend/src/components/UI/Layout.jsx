import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  const tabs = [
    { label: "Inicio", path: "/inicio", icon: <FaHome /> },
    { label: "Asistencia", path: "/asistencia", icon: <FaClipboardList /> },
    { label: "Registro", path: "/formulario", icon: <FaClipboardList /> },
    { label: "Cerrar sesión", path: "#", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="min-h-screen flex font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Avirepro</h1>
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path === "#" ? "#" : tab.path}
            className={`flex items-center space-x-2 p-2 rounded-md transition ${
              pathname === tab.path
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => {
              if (tab.label === "Cerrar sesión") {
                alert("Cerrar sesión (pendiente)");
              }
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
}
