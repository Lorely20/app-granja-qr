// src/pages/AdminConfig.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/UI/Button";

export default function AdminConfig() {
  const [ciclos, setCiclos] = useState([]);
  const [config, setConfig] = useState({ ciclo_activo_id: "" });

  const cargarDatos = async () => {
    try {
      const [configRes, ciclosRes] = await Promise.all([
        api.get("/admin/config"),
        api.get("/admin/ciclos"),
      ]);
      setConfig(configRes.data);
      setCiclos(ciclosRes.data);
    } catch (err) {
      console.error("Error al cargar configuración", err);
    }
  };

  const guardar = async () => {
    try {
      await api.put("/admin/config", config);
      alert("Configuración actualizada");
    } catch (err) {
      console.error("Error al guardar configuración", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">Configuración del Sistema</h1>

      <div className="space-y-2">
        <label className="block font-medium">Ciclo activo</label>
        <select
          value={config.ciclo_activo_id}
          onChange={(e) => setConfig({ ...config, ciclo_activo_id: e.target.value })}
          className="border px-4 py-2 rounded w-full max-w-md"
        >
          <option value="">-- Selecciona --</option>
          {ciclos.map((c) => (
            <option key={c.id} value={c.id}>
              Ciclo #{c.numero} - {c.anio}
            </option>
          ))}
        </select>
      </div>

      {/* */}

      <div className="pt-4">
        <Button onClick={guardar}>Guardar cambios</Button>
      </div>
    </div>
  );
}
