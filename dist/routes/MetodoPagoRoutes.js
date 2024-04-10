"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MetodoPagoController_1 = require("../controllers/MetodoPagoController");
const router = express_1.default.Router();
// Rutas CRUD para Métodos de Pago
router.post('/metodos-pago', MetodoPagoController_1.createMetodoPago);
router.get('/metodos-pago/:id', MetodoPagoController_1.getMetodoPagoById);
router.put('/metodos-pago/:id', MetodoPagoController_1.updateMetodoPago);
router.delete('/metodos-pago/:id', MetodoPagoController_1.deleteMetodoPago);
exports.default = router;
