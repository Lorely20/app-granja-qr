import React, { useState, useEffect } from "react";
import Button from "../components/UI/Button";
import {
  obtenerCiclos,
  crearCiclo,
  actualizarCiclo,
  cerrarCiclo,
  eliminarCiclo
} from "../services/ciclosApi";

export default function AdminConfig() {
 
  const [empresa, setEmpresa] = useState("");
  const [idioma, setIdioma] = useState("es");
  const [emailSoporte, setEmailSoporte] = useState("");

  const [nombreCiclo, setNombreCiclo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [ciclos, setCiclos] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idCicloEditando, setIdCicloEditando] = useState(null);

  useEffect(() => {
    cargarCiclos();
  }, []);

  const cargarCiclos = async () => {
    try {
      const data = await obtenerCiclos();
      setCiclos(data);
    } catch (error) {
      console.error("Error al obtener ciclos:", error);
      alert("Error al obtener ciclos.");
    }
  };

  const handleGuardarConfiguracion = async () => {
    if (!empresa || !idioma || !emailSoporte) {
      alert("Por favor completa todos los campos de configuración.");
      return;
    }

    const datosConfiguracion = { empresa, idioma, emailSoporte };

    try {
      console.log("Datos a guardar:", datosConfiguracion);
      alert("¡Configuración global lista para enviar!");
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      alert("Ocurrió un error al guardar la configuración.");
    }
  };

  const handleCrearCiclo = async () => {
    if (!nombreCiclo || !fechaInicio) {
      alert("Por favor completa todos los campos de ciclo.");
      return;
    }

    const cicloData = {
      numero: parseInt(nombreCiclo) || 1,
      anio: new Date(fechaInicio).getFullYear(),
      fecha_inicio: fechaInicio,
      saldo_inicial_hembras: 5000,
      saldo_inicial_machos: 2500,
      estado
    };

    try {
      if (modoEdicion && idCicloEditando) {
        await actualizarCiclo(idCicloEditando, cicloData);
        alert("¡Ciclo actualizado correctamente!");
      } else {
        await crearCiclo(cicloData);
        alert("¡Ciclo creado correctamente!");
      }
      resetFormularioCiclo();
      cargarCiclos();
    } catch (error) {
      console.error("Error al crear/actualizar ciclo:", error);
      alert("Error al crear/actualizar ciclo.");
    }
  };

  const handleEditarCiclo = (ciclo) => {
    setNombreCiclo(ciclo.numero.toString());
    setFechaInicio(ciclo.fecha_inicio);
    setFechaFin(ciclo.fecha_fin || "");
    setEstado(ciclo.estado);
    setIdCicloEditando(ciclo.id);
    setModoEdicion(true);
  };

  const handleCerrarCiclo = async (id) => {
    if (!window.confirm("¿Seguro que deseas cerrar este ciclo?")) return;
    try {
      await cerrarCiclo(id);
      alert("¡Ciclo cerrado correctamente!");
      cargarCiclos();
    } catch (error) {
      console.error("Error al cerrar ciclo:", error);
      alert("Error al cerrar ciclo.");
    }
  };

  const handleEliminarCiclo = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este ciclo?")) return;
    try {
      await eliminarCiclo(id);
      alert("¡Ciclo eliminado correctamente!");
      cargarCiclos();
    } catch (error) {
      console.error("Error al eliminar ciclo:", error);
      alert("Error al eliminar ciclo.");
    }
  };

  const resetFormularioCiclo = () => {
    setNombreCiclo("");
    setFechaInicio("");
    setFechaFin("");
    setEstado("Activo");
    setModoEdicion(false);
    setIdCicloEditando(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Configuración del Sistema
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Idioma</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Email de Soporte</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={emailSoporte}
            onChange={(e) => setEmailSoporte(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleGuardarConfiguracion}>
          Guardar Configuración
        </Button>
      </div>

      {/* Configuración de ciclos */}
      <h3 className="text-xl font-bold text-blue-600 mt-8 mb-4">
        Configuración de Ciclos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Número del Ciclo</label>
          <input
            type="number"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={nombreCiclo}
            onChange={(e) => setNombreCiclo(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Fecha de Inicio</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Estado</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex space-x-2">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleCrearCiclo}
        >
          {modoEdicion ? "Actualizar Ciclo" : "Crear Ciclo"}
        </Button>
        {modoEdicion && (
          <Button
            className="bg-gray-400 hover:bg-gray-500"
            onClick={resetFormularioCiclo}
          >
            Cancelar
          </Button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          Lista de Ciclos Existentes
        </h3>
        <ul className="border rounded divide-y divide-gray-200">
          {ciclos.map((ciclo) => (
            <li
              key={ciclo.id}
              className="p-3 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <span>
                Ciclo #{ciclo.numero} - Año: {ciclo.anio} - Estado: {ciclo.estado}
              </span>
              <div className="mt-2 md:mt-0 space-x-2">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleEditarCiclo(ciclo)}
                >
                  Editar
                </Button>
                <Button
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={() => handleEliminarCiclo(ciclo.id)}
                >
                  Eliminar
                </Button>
                {ciclo.estado !== "cerrado" && (
                  <Button
                    className="bg-purple-400 hover:bg-purple-500 text-white"
                    onClick={() => handleCerrarCiclo(ciclo.id)}
                  >
                    Cerrar
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

