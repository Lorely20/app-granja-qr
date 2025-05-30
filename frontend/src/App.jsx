import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Inicio from "./pages/Inicio";
import Formulario from "./pages/Formulario";
import Asistencia from "./pages/Asistencia";
import ReporteSuper from "./pages/ReporteSuper";
import AsistenciasSuper from "./pages/AsistenciasSuper"; 
import Layout from "./components/UI/Layout";
import LoginForm from "./pages/LoginForm";
import Trabajador from "./pages/Trabajador";
import Supervisor from "./pages/supervisor";
import AdminLayout from "./components/UI/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminLogs from "./pages/AdminLogs";
import AdminConfig from "./pages/AdminConfig";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Acceso general */}
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Acceso para trabajadores */}
            <Route
              path="/asistencia"
              element={
                <ProtectedRoute role="trabajador">
                  <Asistencia />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formulario"
              element={
                <ProtectedRoute role="trabajador">
                  <Formulario />
                </ProtectedRoute>
              }
            />
            <Route
             path="/trabajador"
             element={
              <ProtectedRoute role="trabajador">
                <Trabajador />
              </ProtectedRoute>
             }
          />

            {/* Acceso para supervisor */}
            <Route
            path="/supervisor/reportes/formulario"
            element={
              <ProtectedRoute role="supervisor">
                <ReporteSuper/>
              </ProtectedRoute>
             }
            />
            <Route
              path="/supervisor/reportes/asistencia"
              element={
                <ProtectedRoute role="supervisor">
                  <AsistenciasSuper/>
                </ProtectedRoute>
              }
            />
            <Route
             path="/supervisor"
             element={
              <ProtectedRoute role="supervisor">
               <Supervisor/>
              </ProtectedRoute>
             }
            />
            <Route
              path="/admin/*"
             element={
              <ProtectedRoute role="admin">
             <AdminDashboard />
           </ProtectedRoute>
             }
          />

          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
