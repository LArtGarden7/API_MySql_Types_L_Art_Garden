import express from 'express';
import { createDevolucion, getDevolucionById, updateDevolucion, deleteDevolucion } from '../controllers/DevolucionesController';

const router = express.Router();

// Rutas CRUD para Devoluciones
router.post('/devoluciones', createDevolucion);
router.get('/devoluciones/:id', getDevolucionById);
router.put('/devoluciones/:id', updateDevolucion);
router.delete('/devoluciones/:id', deleteDevolucion);

export default router;
