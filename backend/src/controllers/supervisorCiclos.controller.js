const db = require('../config/db');

// Obtener lista de ciclos (Supervisor)
exports.obtenerCiclos = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, numero, anio, fecha_inicio, fecha_fin, saldo_inicial_hembras, saldo_inicial_machos, estado
      FROM ciclos
      ORDER BY anio DESC, numero DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ciclos:', error);
    res.status(500).json({ error: 'Error al obtener ciclos' });
  }
};

// Crear un ciclo nuevo (Supervisor)
exports.crearCiclo = async (req, res) => {
  const { numero, anio, fecha_inicio, saldo_inicial_hembras, saldo_inicial_machos } = req.body;

  if (!numero || !anio || !fecha_inicio || !saldo_inicial_hembras || !saldo_inicial_machos) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const fechaInicioObj = new Date(fecha_inicio);
    const fechaFinObj = new Date(fechaInicioObj);
    fechaFinObj.setDate(fechaFinObj.getDate() + 65 * 7);

    const result = await db.query(`
      INSERT INTO ciclos (numero, anio, fecha_inicio, fecha_fin, saldo_inicial_hembras, saldo_inicial_machos)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [numero, anio, fecha_inicio, fechaFinObj, saldo_inicial_hembras, saldo_inicial_machos]);

    res.status(201).json({ mensaje: 'Ciclo creado exitosamente', ciclo: result.rows[0] });
  } catch (error) {
    console.error('Error al crear ciclo:', error);
    res.status(500).json({ error: 'Error al crear ciclo' });
  }
};

// Cerrar ciclo (Supervisor)
exports.cerrarCiclo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`
      UPDATE ciclos
      SET estado = 'cerrado'
      WHERE id = $1
    `, [id]);

    res.json({ mensaje: 'Ciclo cerrado correctamente' });
  } catch (error) {
    console.error('Error al cerrar ciclo:', error);
    res.status(500).json({ error: 'Error al cerrar ciclo' });
  }
};

