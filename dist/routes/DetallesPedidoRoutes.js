"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DetallesPedidoController_1 = require("../controllers/DetallesPedidoController");
const router = express_1.default.Router();
// Rutas CRUD para DetallePedido
router.post('/detalle-pedido', DetallesPedidoController_1.createDetallePedido);
router.get('/detalle-pedido/:id', DetallesPedidoController_1.getDetallePedidoById);
router.put('/detalle-pedido/:id', DetallesPedidoController_1.updateDetallePedido);
router.delete('/detalle-pedido/:id', DetallesPedidoController_1.deleteDetallePedido);
exports.default = router;
