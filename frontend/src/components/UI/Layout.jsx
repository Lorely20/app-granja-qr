import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaClipboardList, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const tabs = [
    { label: "Inicio", path: "/inicio", icon: <FaHome /> },
    ...(usuario?.rol === "trabajador"
      ? [
          { label: "Asistencia", path: "/asistencia", icon: <FaClipboardList /> },
          { label: "Registro", path: "/formulario", icon: <FaClipboardList /> },
        ]
      : usuario?.rol === "supervisor"
      ? [
          { label: "Reporte Asistencia", path: "/supervisor/reportes/asistencia", icon: <FaClipboardList /> },
          { label: "Reporte Diario", path: "/supervisor/reportes/formulario", icon: <FaClipboardList /> },
        ]
      : []),  
    {
      label: usuario ? "Cerrar sesión" : "Iniciar sesión",
      path: usuario ? "#" : "/login",
      icon: usuario ? <FaSignOutAlt /> : <FaSignInAlt />,
    },
  ];

  const handleClick = (label) => {
    if (label === "Cerrar sesión") {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h1 className="text-xl font-bold text-blue-600 mb-6">Avirepro</h1>
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.path}
            onClick={() => handleClick(tab.label)}
            className={`flex items-center space-x-2 p-2 rounded-md transition ${
              pathname === tab.path
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </aside>

      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
}

