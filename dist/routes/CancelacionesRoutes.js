"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CancelacionesController_1 = require("../controllers/CancelacionesController");
const router = express_1.default.Router();
// Rutas CRUD para Cancelaciones
router.post('/cancelaciones', CancelacionesController_1.createCancelacion);
router.get('/cancelaciones/:id', CancelacionesController_1.getCancelacionById);
router.put('/cancelaciones/:id', CancelacionesController_1.updateCancelacion);
router.delete('/cancelaciones/:id', CancelacionesController_1.deleteCancelacion);
exports.default = router;
