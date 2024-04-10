import express from 'express';
import { createNotificacion, getNotificacionById, updateNotificacion, deleteNotificacion } from '../controllers/NotificacionController';

const router = express.Router();

// Rutas CRUD para Notificaciones
router.post('/notificaciones', createNotificacion);
router.get('/notificaciones/:id', getNotificacionById);
router.put('/notificaciones/:id', updateNotificacion);
router.delete('/notificaciones/:id', deleteNotificacion);

export default router;
