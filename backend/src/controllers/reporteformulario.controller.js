const db = require('../config/db');

exports.reporteFormulario = async (req, res) => {
  const { desde, hasta, colaborador_id, galera_id } = req.query;

  let query = `
    SELECT rf.*, c.nombre AS colaborador_nombre
    FROM reportes_diarios rf
    JOIN colaboradores c ON rf.colaborador_id = c.id
    WHERE rf.fecha BETWEEN $1 AND $2
  `;
  const params = [desde, hasta];
  let i = 3;

  if (colaborador_id) {
    query += ` AND rf.colaborador_id = $${i++}`;
    params.push(colaborador_id);
  }

  if (galera_id) {
    query += ` AND rf.galera_id = $${i++}`;
    params.push(galera_id);
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en reporte formulario:', err);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};
