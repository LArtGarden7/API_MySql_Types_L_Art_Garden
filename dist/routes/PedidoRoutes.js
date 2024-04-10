"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PedidoController_1 = require("../controllers/PedidoController");
const router = express_1.default.Router();
router.post('/pedido', PedidoController_1.createPedido);
router.get('/pedido/:id', PedidoController_1.getPedidoById);
router.put('/pedido/:id', PedidoController_1.updatePedido);
router.delete('/pedido/:id', PedidoController_1.deletePedido);
exports.default = router;
