// src/components/admin/AdminLayout.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ children }) {
  const { usuario, logout } = useAuth();

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Usuarios", path: "/admin/usuarios" },
    { label: "Configuración", path: "/admin/config" },
    { label: "Logs", path: "/admin/logs" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <aside className="w-64 bg-white shadow-md px-4 py-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-600">Panel Admin</h2>
        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

     
      <div className="flex flex-col flex-grow">
       
        <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Bienvenido, {usuario?.nombre}
          </span>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
