import express from 'express';
import { createDetallePedido, getDetallePedidoById, updateDetallePedido, deleteDetallePedido } from '../controllers/DetallesPedidoController';

const router = express.Router();

// Rutas CRUD para DetallePedido
router.post('/detallePedido', createDetallePedido);
router.get('/detallePedido/:id', getDetallePedidoById);
router.put('/detallePedido/:id', updateDetallePedido);
router.delete('/detallePedido/:id', deleteDetallePedido);

export default router;
