import express from 'express';
import { createCancelacion, getCancelacionById, updateCancelacion, deleteCancelacion } from '../controllers/CancelacionesController';

const router = express.Router();

// Rutas CRUD para Cancelaciones
router.post('/cancelaciones', createCancelacion);
router.get('/cancelaciones/:id', getCancelacionById);
router.put('/cancelaciones/:id', updateCancelacion);
router.delete('/cancelaciones/:id', deleteCancelacion);

export default router;
