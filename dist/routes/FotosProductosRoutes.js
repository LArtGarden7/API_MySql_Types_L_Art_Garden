"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FotosProductosController_1 = require("../controllers/FotosProductosController");
const router = express_1.default.Router();
router.post('/fotos-productos', FotosProductosController_1.createFotoProducto);
router.get('/fotos-productos/:id', FotosProductosController_1.getFotoProductoById);
router.delete('/fotos-productos/:id', FotosProductosController_1.deleteFotoProducto);
exports.default = router;
