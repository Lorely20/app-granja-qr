
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Formulario from "./pages/Formulario";
import Asistencia from "./pages/Asistencia";
import Reporte from "./pages/Reporte";
import Layout from "./components/UI/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/reporte" element={<Reporte />} />
        </Routes>
      </Layout>
    </Router>
  );
}
