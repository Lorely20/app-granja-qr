const express = require("express");
const router = express.Router();


const {
  crearReporte,
  obtenerColaboradores
} = require("../controllers/reporte.controller");


const {
  registrarAsistencia
} = require("../controllers/asistencia.controller");


router.post("/reporte", crearReporte);
router.get("/colaboradores", obtenerColaboradores);

router.post("/asistencia", registrarAsistencia);

module.exports = router;

