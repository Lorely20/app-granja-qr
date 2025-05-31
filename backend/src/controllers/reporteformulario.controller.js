const db = require('../config/db');

exports.reporteFormulario = async (req, res) => {
  const { desde, hasta, colaborador_id, galera_id, ciclo_id } = req.query;

  let query = `
    SELECT rf.*, c.nombre AS colaborador_nombre
    FROM reportes_diarios rf
    JOIN colaboradores c ON rf.colaborador_id = c.id
    JOIN ciclos ci 
      ON rf.fecha BETWEEN ci.fecha_inicio AND COALESCE(ci.fecha_fin, CURRENT_DATE)
  `;
  
  let conditions = [];
  const params = [];
  let i = 1;

  if (desde && hasta) {
    conditions.push(`rf.fecha BETWEEN $${i++} AND $${i++}`);
    params.push(desde, hasta);
  }

  if (colaborador_id) {
    conditions.push(`rf.colaborador_id = $${i++}`);
    params.push(colaborador_id);
  }

  if (galera_id) {
    conditions.push(`rf.galera_id = $${i++}`);
    params.push(galera_id);
  }

  if (ciclo_id) {
    conditions.push(`ci.id = $${i++}`);
    params.push(ciclo_id);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  query += ` ORDER BY rf.fecha DESC`;

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en reporte formulario:', err);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};
