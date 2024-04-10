"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DireccionesEnvioController_1 = require("../controllers/DireccionesEnvioController");
const router = express_1.default.Router();
// Rutas CRUD para Direcciones de Envío
router.post('/direcciones-envio', DireccionesEnvioController_1.createDireccionEnvio);
router.get('/direcciones-envio/:id', DireccionesEnvioController_1.getDireccionEnvioById);
router.put('/direcciones-envio/:id', DireccionesEnvioController_1.updateDireccionEnvio);
router.delete('/direcciones-envio/:id', DireccionesEnvioController_1.deleteDireccionEnvio);
exports.default = router;
