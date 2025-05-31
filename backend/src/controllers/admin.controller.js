const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { usuarioCrearSchema, usuarioActualizarSchema } = require("../validations/adminValidation");

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
    const result = await db.query("SELECT id, nombre, email, rol FROM usuarios ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

//Crear usuario
exports.crearUsuario = async (req, res) => {
  const { error } = usuarioCrearSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { nombre, email, password, rol } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)`,
      [nombre, email, hashed, rol]
    );
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
//Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { error } = usuarioActualizarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    await db.query(
      `UPDATE usuarios SET nombre=$1, email=$2, rol=$3 WHERE id=$4`,
      [nombre, email, rol, id]
    );
    res.json({ mensaje: "Usuario actualizado" });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
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

exports.crearCiclo = async (req, res) => {
  const { numero, anio, fecha_inicio, saldo_inicial_hembras, saldo_inicial_machos } = req.body;

  if (!numero || !anio || !fecha_inicio || !saldo_inicial_hembras || !saldo_inicial_machos) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Calcular la fecha fin (65 semanas)
    const fechaInicioObj = new Date(fecha_inicio);
    const fechaFinObj = new Date(fechaInicioObj);
    fechaFinObj.setDate(fechaFinObj.getDate() + 65 * 7); // 65 semanas * 7 días

    const result = await db.query(`
      INSERT INTO ciclos (numero, anio, fecha_inicio, fecha_fin, saldo_inicial_hembras, saldo_inicial_machos)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [numero, anio, fecha_inicio, fechaFinObj, saldo_inicial_hembras, saldo_inicial_machos]);

    res.status(201).json({ mensaje: "Ciclo creado exitosamente", ciclo: result.rows[0] });
  } catch (error) {
    console.error("Error al crear ciclo:", error);
    res.status(500).json({ error: "Error al crear ciclo" });
  }
};

// Actualizar un ciclo existente
exports.actualizarCiclo = async (req, res) => {
  const { id } = req.params;
  const { numero, anio, fecha_inicio, saldo_inicial_hembras, saldo_inicial_machos, estado } = req.body;

  if (!numero || !anio || !fecha_inicio || !saldo_inicial_hembras || !saldo_inicial_machos || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const fechaInicioObj = new Date(fecha_inicio);
    const fechaFinObj = new Date(fechaInicioObj);
    fechaFinObj.setDate(fechaFinObj.getDate() + 65 * 7);

    await db.query(`
      UPDATE ciclos
      SET numero=$1, anio=$2, fecha_inicio=$3, fecha_fin=$4,
          saldo_inicial_hembras=$5, saldo_inicial_machos=$6, estado=$7
      WHERE id=$8
    `, [numero, anio, fecha_inicio, fechaFinObj, saldo_inicial_hembras, saldo_inicial_machos, estado, id]);

    res.json({ mensaje: "Ciclo actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar ciclo:", error);
    res.status(500).json({ error: "Error al actualizar ciclo" });
  }
};

// Cerrar un ciclo
exports.cerrarCiclo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`
      UPDATE ciclos
      SET estado='cerrado'
      WHERE id=$1
    `, [id]);

    res.json({ mensaje: "Ciclo cerrado correctamente" });
  } catch (error) {
    console.error("Error al cerrar ciclo:", error);
    res.status(500).json({ error: "Error al cerrar ciclo" });
  }
};

// Eliminar un ciclo (opcional)
exports.eliminarCiclo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM ciclos WHERE id=$1", [id]);
    res.json({ mensaje: "Ciclo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ciclo:", error);
    res.status(500).json({ error: "Error al eliminar ciclo" });
  }
};