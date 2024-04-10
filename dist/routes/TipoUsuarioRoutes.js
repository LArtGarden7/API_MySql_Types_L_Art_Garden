"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/TipoUsuarioRoutes.ts
const express_1 = __importDefault(require("express"));
const TipoUsuarioController_1 = require("../controllers/TipoUsuarioController");
const router = express_1.default.Router();
router.post('/tipoUsuario', TipoUsuarioController_1.createTipoUsuario);
router.get('/tipoUsuario/:id', TipoUsuarioController_1.getTipoUsuarioById);
router.put('/tipoUsuario/:id', TipoUsuarioController_1.updateTipoUsuario);
router.delete('/tipoUsuario/:id', TipoUsuarioController_1.deleteTipoUsuario);
exports.default = router;
