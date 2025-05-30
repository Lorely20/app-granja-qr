import React, { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../components/UI/AdminLayout";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/admin/logs");
        setLogs(res.data);
      } catch (error) {
        console.error("Error al cargar logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">📊 Actividad del sistema</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Acción</th>
              <th className="px-4 py-2">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2">{new Date(log.fecha).toLocaleString()}</td>
                <td className="px-4 py-2">{log.usuario || "Sistema"}</td>
                <td className="px-4 py-2">{log.accion}</td>
                <td className="px-4 py-2">{log.ip || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}