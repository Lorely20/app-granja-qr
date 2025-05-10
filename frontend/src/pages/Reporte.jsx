import React from 'react';
export default function Reporte() {
    return (
      <div className="min-h-screen bg-white p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reporte de Producción</h2>
  
        <div className="space-y-4">
          <div className="bg-orange-100 p-4 rounded-md shadow">
            <p className="text-sm text-gray-700">Día 5</p>
            <p className="font-semibold text-gray-900">Consumo Machos: 97g</p>
          </div>
  
          <div className="bg-orange-100 p-4 rounded-md shadow">
            <p className="text-sm text-gray-700">Día 5</p>
            <p className="font-semibold text-gray-900">Consumo Hembras: 97g</p>
          </div>
  
          <div className="bg-red-100 p-4 rounded-md shadow">
            <p className="text-sm text-gray-700">Día 5</p>
            <p className="font-semibold text-gray-900">Mortalidad Machos: 98 aves (1.13%)</p>
          </div>
  
          <div className="bg-red-100 p-4 rounded-md shadow">
            <p className="text-sm text-gray-700">Día 5</p>
            <p className="font-semibold text-gray-900">Mortalidad Hembras: 46 aves (0.53%)</p>
          </div>
        </div>
      </div>
    );
  }
  