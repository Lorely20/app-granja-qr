const db = require("../config/db");
const bcrypt = require("bcryptjs");

//Obtener logs del sistema
exports.obtenerLogs = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT l.*, u.nombre AS usuario 
      FROM logs_sistema l
      LEFT JOIN usuarios u ON u.id = l.usuario_id
      ORDER BY l.fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ error: "Error al obtener logs del sistema" });
  }
};

//Ver configuraciones del sistema
exports.obtenerConfiguraciones = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM configuracion_sistema ORDER BY clave");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener configuraciones:", error);
    res.status(500).json({ error: "Error al obtener configuraciones" });
  }
};

//Actualizar configuración por clave
exports.actualizarConfiguracion = async (req, res) => {
  const { clave } = req.params;
  const { valor } = req.body;

  try {
    await db.query(
      "UPDATE configuracion_sistema SET valor = $1 WHERE clave = $2",
      [valor, clave]
    );
    res.json({ mensaje: "Configuración actualizada" });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    res.status(500).json({ error: "Error al actualizar configuración" });
  }
};

//Ver sesiones activas
exports.obtenerSesiones = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*, u.nombre AS usuario
      FROM sesiones_activas s
      JOIN usuarios u ON u.id = s.usuario_id
      ORDER BY s.ultima_actividad DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    res.status(500).json({ error: "Error al obtener sesiones activas" });
  }
};

//Forzar cierre de sesión
exports.forzarLogout = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM sesiones_activas WHERE id = $1", [id]);
    res.json({ mensaje: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al forzar logout:", error);
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};

//Listar usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const result = await db.query("SELECT id, nombre, email, rol, activo FROM usuarios ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

//Crear usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)`,
      [nombre, email, hashed, rol]
    );
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

//Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol, activo } = req.body;

  try {
    await db.query(
      `UPDATE usuarios SET nombre=$1, email=$2, rol=$3, activo=$4 WHERE id=$5`,
      [nombre, email, rol, activo, id]
    );
    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

//Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

exports.obtenerCiclos = async (req, res) => {
  try {
    const result = await db.query("SELECT id, numero, anio FROM ciclos ORDER BY anio DESC, numero DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener ciclos:", error);
    res.status(500).json({ error: "Error al obtener ciclos" });
  }
};