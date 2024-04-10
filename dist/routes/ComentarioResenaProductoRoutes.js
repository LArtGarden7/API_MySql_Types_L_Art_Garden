"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ComentarioResenaProductoController_1 = require("../controllers/ComentarioResenaProductoController");
const router = express_1.default.Router();
// Rutas CRUD para Comentarios o Reseñas de Productos
router.post('/comentarios-resenas-productos', ComentarioResenaProductoController_1.createComentarioResenaProducto);
router.get('/comentarios-resenas-productos/:id', ComentarioResenaProductoController_1.getComentarioResenaProductoById);
router.put('/comentarios-resenas-productos/:id', ComentarioResenaProductoController_1.updateComentarioResenaProducto);
router.delete('/comentarios-resenas-productos/:id', ComentarioResenaProductoController_1.deleteComentarioResenaProducto);
exports.default = router;
