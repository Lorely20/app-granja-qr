const db = require('../config/db');
exports.crearReporte = async (req, res) => {
  const {
    colaborador_id,
    galera_id,
    fecha,
    mortalidad_hembra,
    mortalidad_macho,
    consumo_alimento,
    huevo_fertil,
    huevo_pequeno,
    huevo_mediano,
    huevo_grande,
    huevo_jumbo
  } = req.body;

  try {
    const query = `
      INSERT INTO reportes_diarios (
        colaborador_id, galera_id, fecha,
        mortalidad_hembra, mortalidad_macho,
        consumo_alimento,
        huevo_fertil, huevo_pequeno, huevo_mediano, huevo_grande, huevo_jumbo
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    `;
    await db.query(query, [
      colaborador_id, galera_id, fecha,
      mortalidad_hembra, mortalidad_macho,
      consumo_alimento,
      huevo_fertil, huevo_pequeno, huevo_mediano, huevo_grande, huevo_jumbo
    ]);

    res.status(201).json({ message: "Reporte guardado exitosamente" });
  } catch (error) {
    console.error("Error al guardar reporte:", error);
    res.status(500).json({ error: "Error al guardar el reporte" });
  }
};

exports.obtenerReportes = async (req, res) => {
  const { galera_id, desde, hasta } = req.query;

  try {
    const query = `
      SELECT * FROM reportes_diarios
      WHERE galera_id = $1
      AND fecha BETWEEN $2 AND $3
      ORDER BY fecha DESC
    `;
    const result = await db.query(query, [galera_id, desde, hasta]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ error: "Error al obtener reportes" });
  }
};

exports.obtenerColaboradores = async (req, res) => {
  try {
    const result = await db.query("SELECT id, nombre FROM colaboradores");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener colaboradores:", error);
    res.status(500).json({ error: "Error al obtener colaboradores" });
  }
};

