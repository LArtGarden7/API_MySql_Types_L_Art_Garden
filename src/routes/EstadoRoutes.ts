import express from 'express';
import { createEstado, getEstadoById, updateEstado, deleteEstado } from '../controllers/EstadoController';

const router = express.Router();

// Rutas CRUD para Estados
router.post('/estados', createEstado);
router.get('/estados/:id', getEstadoById);
router.put('/estados/:id', updateEstado);
router.delete('/estados/:id', deleteEstado);

export default router;
