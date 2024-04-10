"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FloreriaController_1 = require("../controllers/FloreriaController");
const router = express_1.default.Router();
router.post('/florerias', FloreriaController_1.createFloreria);
router.get('/florerias/:id', FloreriaController_1.getFloreriaById);
router.put('/florerias/:id', FloreriaController_1.updateFloreria);
router.delete('/florerias/:id', FloreriaController_1.deleteFloreria);
exports.default = router;
