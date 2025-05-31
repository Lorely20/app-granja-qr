const express = require('express');
const router = express.Router();
const formularioCtrl = require('../controllers/reporteformulario.controller');
const asistenciaCtrl = require('../controllers/reporteasistencia.controller');
const ciclosCtrl = require('../controllers/supervisorCiclos.controller');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

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

router.get(
  '/ciclos',
  verifyToken,
  requireRole('supervisor'),
  ciclosCtrl.obtenerCiclos
);

router.post(
  '/ciclos',
  verifyToken,
  requireRole('supervisor'),
  ciclosCtrl.crearCiclo
);

router.patch(
  '/ciclos/:id/cerrar',
  verifyToken,
  requireRole('supervisor'),
  ciclosCtrl.cerrarCiclo
);

module.exports = router;
