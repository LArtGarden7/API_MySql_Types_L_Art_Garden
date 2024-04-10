"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EstadoController_1 = require("../controllers/EstadoController");
const router = express_1.default.Router();
// Rutas CRUD para Estados
router.post('/estados', EstadoController_1.createEstado);
router.get('/estados/:id', EstadoController_1.getEstadoById);
router.put('/estados/:id', EstadoController_1.updateEstado);
router.delete('/estados/:id', EstadoController_1.deleteEstado);
exports.default = router;
