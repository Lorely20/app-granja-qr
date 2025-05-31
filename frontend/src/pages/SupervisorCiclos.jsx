import React, { useState, useEffect } from 'react';
import {
  obtenerCiclosSupervisor,
  crearCicloSupervisor,
  cerrarCicloSupervisor
} from '../services/ciclosApi';

export default function SupervisorCiclos() {
  const [ciclos, setCiclos] = useState([]);
  const [form, setForm] = useState({
    fecha_inicio: '',
    saldo_inicial_hembras: '',
    saldo_inicial_machos: ''
  });

  useEffect(() => {
    cargarCiclos();
  }, []);

  const cargarCiclos = async () => {
    try {
      const data = await obtenerCiclosSupervisor();
      setCiclos(data);
    } catch (error) {
      console.error('Error cargando ciclos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCrearCiclo = async () => {
    if (!form.fecha_inicio || !form.saldo_inicial_hembras || !form.saldo_inicial_machos) {
      alert('Por favor completa todos los campos');
      return;
    }

    const fechaInicio = new Date(form.fecha_inicio);
    const anio = fechaInicio.getFullYear();
    let numeroCiclo = 1;

    if (ciclos.length > 0) {
      const ultimosCiclos = ciclos
        .filter(c => c.anio === anio)
        .map(c => c.numero);
      if (ultimosCiclos.length > 0) {
        numeroCiclo = Math.max(...ultimosCiclos) + 1;
      }
    }

    const cicloData = {
      numero: numeroCiclo,
      anio: anio,
      fecha_inicio: form.fecha_inicio,
      saldo_inicial_hembras: parseInt(form.saldo_inicial_hembras),
      saldo_inicial_machos: parseInt(form.saldo_inicial_machos)
    };

    try {
      await crearCicloSupervisor(cicloData);
      alert(`¡Ciclo ${numeroCiclo} creado correctamente!`);
      setForm({ fecha_inicio: '', saldo_inicial_hembras: '', saldo_inicial_machos: '' });
      cargarCiclos();
    } catch (error) {
      console.error('Error creando ciclo:', error);
      alert('Hubo un error al crear el ciclo');
    }
  };

  const handleCerrarCiclo = async (id) => {
    if (!window.confirm("¿Estás seguro de cerrar este ciclo? Esta acción no se puede deshacer.")) return;
    try {
      await cerrarCicloSupervisor(id);
      alert('Ciclo cerrado correctamente');
      cargarCiclos();
    } catch (error) {
      console.error('Error cerrando ciclo:', error);
      alert('Hubo un error al cerrar el ciclo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h1 className="text-xl font-bold text-blue-600 mb-4">Gestión de Ciclos</h1>

      {/* Formulario para crear ciclo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Fecha de Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={form.fecha_inicio}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Saldo Inicial Hembras</label>
          <input
            type="number"
            name="saldo_inicial_hembras"
            value={form.saldo_inicial_hembras}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Saldo Inicial Machos</label>
          <input
            type="number"
            name="saldo_inicial_machos"
            value={form.saldo_inicial_machos}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCrearCiclo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Crear Ciclo
          </button>
        </div>
      </div>

      {/* Lista de ciclos */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Número</th>
              <th className="border px-2 py-1">Año</th>
              <th className="border px-2 py-1">Fecha Inicio</th>
              <th className="border px-2 py-1">Fecha Fin</th>
              <th className="border px-2 py-1">Saldo Hembras</th>
              <th className="border px-2 py-1">Saldo Machos</th>
              <th className="border px-2 py-1">Estado</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ciclos.map((ciclo, index) => (
              <tr key={ciclo.id}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{ciclo.numero}</td>
                <td className="border px-2 py-1">{ciclo.anio}</td>
                <td className="border px-2 py-1">{ciclo.fecha_inicio}</td>
                <td className="border px-2 py-1">{ciclo.fecha_fin || '-'}</td>
                <td className="border px-2 py-1">{ciclo.saldo_inicial_hembras}</td>
                <td className="border px-2 py-1">{ciclo.saldo_inicial_machos}</td>
                <td className="border px-2 py-1">{ciclo.estado}</td>
                <td className="border px-2 py-1 text-center">
                  {ciclo.estado === 'abierto' && (
                    <button
                      onClick={() => handleCerrarCiclo(ciclo.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cerrar Ciclo
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
