const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.use(verifyToken, requireRole("admin"));

// Logs del sistema
router.get("/logs", adminCtrl.obtenerLogs);

// Configuración
router.get('/config', adminCtrl.obtenerConfiguraciones);
router.put('/config/:clave', adminCtrl.actualizarConfiguracion);
router.get('/ciclos', adminCtrl.obtenerCiclos);

// Sesiones
router.get("/sesiones", adminCtrl.obtenerSesiones);
router.delete("/sesiones/:id", adminCtrl.forzarLogout);

// Usuarios
router.get("/usuarios", adminCtrl.listarUsuarios);
router.post("/usuarios", adminCtrl.crearUsuario);
router.put("/usuarios/:id", adminCtrl.actualizarUsuario);
router.delete("/usuarios/:id", adminCtrl.eliminarUsuario);

module.exports = router;