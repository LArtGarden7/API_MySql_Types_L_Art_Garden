"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaProductoController_1 = require("../controllers/CategoriaProductoController");
const router = express_1.default.Router();
router.post('/categoria-producto', CategoriaProductoController_1.createCategoriaProducto);
router.get('/categoria-producto/:id', CategoriaProductoController_1.getCategoriaProductoById);
router.put('/categoria-producto/:id', CategoriaProductoController_1.updateCategoriaProducto);
router.delete('/categoria-producto/:id', CategoriaProductoController_1.deleteCategoriaProducto);
exports.default = router;
