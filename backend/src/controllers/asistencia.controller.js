const db = require('../config/db');

exports.registrarAsistencia = async (req, res) => {
  const { colaborador_id, tipo, fecha } = req.body;

  if (!tipo || !['entrada', 'salida'].includes(tipo)) {
    return res.status(400).json({ error: "Tipo de asistencia inválido" });
  }

  if (!fecha) {
    return res.status(400).json({ error: "La fecha es obligatoria" });
  }

  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);

  const fechaIngresada = new Date(fecha);
  const fechaIngresadaSoloFecha = new Date(fechaIngresada);
  fechaIngresadaSoloFecha.setHours(0, 0, 0, 0);

  if (fechaIngresadaSoloFecha < fechaHoy) {
    return res.status(400).json({ error: "No se permite registrar asistencia en fechas pasadas" });
  }

  if (fechaIngresadaSoloFecha > fechaHoy) {
    return res.status(400).json({ error: "No se permite registrar asistencia en fechas futuras" });
  }

  
  const horaExacta = fechaIngresada.toTimeString().split(' ')[0]; // HH:MM:SS

  try {
    const result = await db.query(
      `SELECT * FROM asistencias WHERE colaborador_id = $1 AND fecha = $2`,
      [colaborador_id, fechaHoy.toISOString().split("T")[0]] 
    );

    const asistencia = result.rows[0];

    if (tipo === 'entrada') {
      if (!asistencia) {
        const insert = await db.query(
          `INSERT INTO asistencias (colaborador_id, fecha, hora_entrada)
           VALUES ($1, $2, $3) RETURNING hora_entrada`,
          [colaborador_id, fechaHoy.toISOString().split("T")[0], horaExacta]
        );
        return res.status(201).json({ mensaje: `Entrada registrada a las ${insert.rows[0].hora_entrada}` });
      } else {
        return res.status(200).json({ mensaje: "La entrada ya fue registrada" });
      }
    }

    if (tipo === 'salida') {
      if (!asistencia) {
        return res.status(400).json({ mensaje: "Debe registrar la entrada primero" });
      }

      if (asistencia.hora_salida) {
        return res.status(200).json({ mensaje: "La salida ya fue registrada" });
      }

      const update = await db.query(
        `UPDATE asistencias SET hora_salida = $1 WHERE id = $2 RETURNING hora_salida`,
        [horaExacta, asistencia.id]
      );
      return res.status(200).json({ mensaje: `Salida registrada a las ${update.rows[0].hora_salida}` });
    }

  } catch (err) {
    console.error("Error en asistencia:", err);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
