import React from "react";
import Button from "./Button";

export default function TablaUsuarios({ usuarios, onEliminar }) {
  return (
    <div className="overflow-x-auto shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rol</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-4 py-2 text-sm text-gray-800">{usuario.nombre}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{usuario.email}</td>
              <td className="px-4 py-2 text-sm text-gray-800 capitalize">{usuario.rol}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={() => alert("Editar usuario")}>
                  Editar
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => onEliminar(usuario.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
