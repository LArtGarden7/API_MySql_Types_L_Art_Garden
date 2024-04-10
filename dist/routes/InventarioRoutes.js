"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InventarioController_1 = require("../controllers/InventarioController");
const router = express_1.default.Router();
router.post('/inventario', InventarioController_1.createInventario);
router.get('/inventario/:id', InventarioController_1.getInventarioById);
router.put('/inventario/:id', InventarioController_1.updateInventario);
router.delete('/inventario/:id', InventarioController_1.deleteInventario);
exports.default = router;
