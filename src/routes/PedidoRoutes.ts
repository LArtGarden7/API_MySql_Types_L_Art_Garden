import express from 'express';
import {getPedidosByIdInventario, createPedido, getPedidoById, updatePedido, deletePedido } from '../controllers/PedidoController';

const router = express.Router();

router.post('/pedidosFloreria', getPedidosByIdInventario);
router.post('/pedido', createPedido);
router.get('/pedido/:id', getPedidoById);
router.put('/pedido/:id', updatePedido);
router.delete('/pedido/:id', deletePedido);

export default router;
