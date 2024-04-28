import express from 'express';
import {updateEstadoPedido, getPedidosByIdInventario, createPedidoPA, createPedido, getPedidoByUserId, updatePedido, deletePedido } from '../controllers/PedidoController';

const router = express.Router();

router.post('/pedidosFloreria', getPedidosByIdInventario);
router.post('/pedidoUpdateEstado', updateEstadoPedido);
router.post('/addPedido', createPedido);
router.post('/pedido', getPedidoByUserId);
router.put('/pedido/:id', updatePedido);
router.delete('/pedido/:id', deletePedido);
router.post('/api/pedidos/create', createPedidoPA);

export default router;
