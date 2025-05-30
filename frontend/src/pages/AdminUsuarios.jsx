import React, { useEffect, useState } from "react";
import TablaUsuarios from "../components/UI/TablaUsuarios";
import Button from "../components/UI/Button";
import api from "../services/api";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const { data } = await api.get("/admin/usuarios");
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await api.delete(`/admin/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">Gestión de Usuarios</h1>
      <div className="flex justify-end">
        <Button onClick={() => alert("Formulario para nuevo usuario")}>
          Crear nuevo usuario
        </Button>
      </div>
      <TablaUsuarios usuarios={usuarios} onEliminar={eliminarUsuario} />
    </div>
  );
}
