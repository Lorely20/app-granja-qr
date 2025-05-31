import api from "./api";


export const obtenerCiclos = async () => {
  const response = await api.get("/admin/ciclos");
  return response.data;
};

export const crearCiclo = async (cicloData) => {
  const response = await api.post("/admin/ciclos", cicloData);
  return response.data;
};

export const actualizarCiclo = async (id, cicloData) => {
  const response = await api.put(`/admin/ciclos/${id}`, cicloData);
  return response.data;
};

export const cerrarCiclo = async (id) => {
  const response = await api.patch(`/admin/ciclos/${id}/cerrar`);
  return response.data;
};

export const eliminarCiclo = async (id) => {
  const response = await api.delete(`/admin/ciclos/${id}`);
  return response.data;
};

export const obtenerCiclosSupervisor = async () => {
  const response = await api.get("/supervisor/ciclos");
  return response.data;
};

export const crearCicloSupervisor = async (cicloData) => {
  const response = await api.post("/supervisor/ciclos", cicloData);
  return response.data;
};

export const cerrarCicloSupervisor = async (id) => {
  const response = await api.patch(`/supervisor/ciclos/${id}/cerrar`);
  return response.data;
};