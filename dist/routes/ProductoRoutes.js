"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductoController_1 = require("../controllers/ProductoController");
const router = express_1.default.Router();
router.post('/producto', ProductoController_1.createProducto);
router.get('/producto/:id', ProductoController_1.getProductoById);
router.put('/producto/:id', ProductoController_1.updateProducto);
router.delete('/producto/:id', ProductoController_1.deleteProducto);
exports.default = router;
