import React from "react";

export default function Inicio() {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-r from-white to-blue-50 overflow-hidden">

  <img 
    src="/img/gallina-fondo.png" 
    alt="Gallina de fondo"
    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
  />

  <div className="relative z-10 animate-fade-in">
    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">Bienvenido</h1>
    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">GRANJA OLIMPOS</h2>
    <p className="italic text-lg md:text-xl text-gray-700">"Comprometidos con la excelencia avícola"</p>
  </div>
</div>

  );
}

