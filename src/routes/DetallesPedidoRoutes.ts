import express from 'express';
import { createDetallePedido, getDetallePedidoById, updateDetallePedido, deleteDetallePedido } from '../controllers/DetallesPedidoController';

const router = express.Router();

// Rutas CRUD para DetallePedido
router.post('/detalle-pedido', createDetallePedido);
router.get('/detalle-pedido/:id', getDetallePedidoById);
router.put('/detalle-pedido/:id', updateDetallePedido);
router.delete('/detalle-pedido/:id', deleteDetallePedido);

export default router;
