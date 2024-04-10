"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PagoController_1 = require("../controllers/PagoController");
const router = express_1.default.Router();
// Rutas CRUD para Pagos
router.post('/pagos', PagoController_1.createPago);
router.get('/pagos/:id', PagoController_1.getPagoById);
router.put('/pagos/:id', PagoController_1.updatePago);
router.delete('/pagos/:id', PagoController_1.deletePago);
exports.default = router;
