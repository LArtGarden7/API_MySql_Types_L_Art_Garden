import express from 'express';
import {updateEstadoPedido, getPedidosByIdInventario, createPedidoPA, createPedido, getPedidoById, updatePedido, deletePedido } from '../controllers/PedidoController';

const router = express.Router();

router.post('/pedidosFloreria', getPedidosByIdInventario);
router.post('/pedidoUpdateEstado', updateEstadoPedido);
router.post('/addPedido', createPedido);
router.get('/pedido/:id', getPedidoById);
router.put('/pedido/:id', updatePedido);
router.delete('/pedido/:id', deletePedido);
router.post('/api/pedidos/create', createPedidoPA);

export default router;
