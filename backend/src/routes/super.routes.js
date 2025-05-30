const express = require('express');
const router = express.Router();
const formularioCtrl = require('../controllers/reporteformulario.controller');
const asistenciaCtrl = require('../controllers/reporteasistencia.controller');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Rutas protegidas para supervisor
router.get(
  '/reportes/formulario',
  verifyToken,
  requireRole('supervisor'),
  formularioCtrl.reporteFormulario
);

router.get(
  '/reportes/asistencia',
  verifyToken,
  requireRole('supervisor'),
  asistenciaCtrl.reporteAsistencia
);

module.exports = router;
