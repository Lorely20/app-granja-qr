import React, { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { obtenerCiclos } from "../services/ciclosApi";

export default function ReporteSuper() {
  const [datos, setDatos] = useState([]);
  const [galeras, setGaleras] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    galera_id: "",
    colaborador_id: "",
    ciclo_id: ""
  });

  const fetchData = async () => {
    try {
      const res = await api.get("/supervisor/reportes/formulario", { params: filtros });
      setDatos(res.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useEffect(() => {
    api.get("/colaboradores").then(res => setColaboradores(res.data));
    setGaleras(["G1", "G2", "G3"]);
    cargarCiclos();
  }, []);

  const cargarCiclos = async () => {
    try {
      const data = await obtenerCiclos();
      setCiclos(data); // 🚀 Incluye todos los ciclos (abiertos y cerrados)
    } catch (error) {
      console.error("Error cargando ciclos:", error);
    }
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "reporte_formulario.xlsx");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reporte Diario de Formulario</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <input
          type="date"
          value={filtros.desde}
          onChange={(e) => setFiltros({ ...filtros, desde: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={filtros.hasta}
          onChange={(e) => setFiltros({ ...filtros, hasta: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <select
          value={filtros.galera_id}
          onChange={(e) => setFiltros({ ...filtros, galera_id: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todas las galeras</option>
          {galeras.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={filtros.colaborador_id}
          onChange={(e) => setFiltros({ ...filtros, colaborador_id: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <select
          value={filtros.ciclo_id}
          onChange={(e) => setFiltros({ ...filtros, ciclo_id: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos los ciclos</option>
          {ciclos.map((c) => (
            <option key={c.id} value={c.id}>
              Ciclo {c.numero} ({c.anio}) - {c.estado}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Buscar
        </button>
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Exportar Excel
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Galera</th>
              <th className="border px-2 py-1">Trabajador</th>
              <th className="border px-2 py-1">Mortalidad H</th>
              <th className="border px-2 py-1">Mortalidad M</th>
              <th className="border px-2 py-1">Alimento</th>
              <th className="border px-2 py-1">H. Fertil</th>
              <th className="border px-2 py-1">Pequeño</th>
              <th className="border px-2 py-1">Mediano</th>
              <th className="border px-2 py-1">Grande</th>
              <th className="border px-2 py-1">Jumbo</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((r, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border px-2 py-1">{r.fecha}</td>
                <td className="border px-2 py-1">{r.galera_id}</td>
                <td className="border px-2 py-1">{r.colaborador_nombre}</td>
                <td className="border px-2 py-1">{r.mortalidad_hembra}</td>
                <td className="border px-2 py-1">{r.mortalidad_macho}</td>
                <td className="border px-2 py-1">{r.consumo_alimento}</td>
                <td className="border px-2 py-1">{r.huevo_fertil}</td>
                <td className="border px-2 py-1">{r.huevo_pequeno}</td>
                <td className="border px-2 py-1">{r.huevo_mediano}</td>
                <td className="border px-2 py-1">{r.huevo_grande}</td>
                <td className="border px-2 py-1">{r.huevo_jumbo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

