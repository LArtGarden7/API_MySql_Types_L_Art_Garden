"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DevolucionesController_1 = require("../controllers/DevolucionesController");
const router = express_1.default.Router();
// Rutas CRUD para Devoluciones
router.post('/devoluciones', DevolucionesController_1.createDevolucion);
router.get('/devoluciones/:id', DevolucionesController_1.getDevolucionById);
router.put('/devoluciones/:id', DevolucionesController_1.updateDevolucion);
router.delete('/devoluciones/:id', DevolucionesController_1.deleteDevolucion);
exports.default = router;
