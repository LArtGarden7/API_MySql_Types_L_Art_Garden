"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificacionController_1 = require("../controllers/NotificacionController");
const router = express_1.default.Router();
// Rutas CRUD para Notificaciones
router.post('/notificaciones', NotificacionController_1.createNotificacion);
router.get('/notificaciones/:id', NotificacionController_1.getNotificacionById);
router.put('/notificaciones/:id', NotificacionController_1.updateNotificacion);
router.delete('/notificaciones/:id', NotificacionController_1.deleteNotificacion);
exports.default = router;
