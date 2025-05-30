import React, { useState } from "react";
import AdminUsuarios from "./AdminUsuarios";
import AdminLogs from "./AdminLogs";
import AdminConfig from "./AdminConfig";
import AdminLayout from "../components/UI/AdminLayout";

function AdminDashboard() {
  const [vista, setVista] = useState("usuarios");

  const renderVista = () => {
    switch (vista) {
      case "usuarios": return <AdminUsuarios />;
      case "logs": return <AdminLogs />;
      case "configuracion": return <AdminConfig />;
      default: return <AdminUsuarios />;
    }
  };

  return (
    <AdminLayout>
      {/* */}
      {renderVista()}
    </AdminLayout>
  );
}

export default AdminDashboard;
