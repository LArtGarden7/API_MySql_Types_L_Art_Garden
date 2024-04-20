import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/UserRoutes';
import floreriaRoutes from './routes/FloreriaRoutes';
import tipoUsuarioRoutes from './routes/TipoUsuarioRoutes';
import inventarioRoutes from './routes/InventarioRoutes';
import categoriasProductosRoutes from './routes/CategoriaProductoRoutes';
import productoRoutes from './routes/ProductoRoutes';
import pedidosRoutes from './routes/PedidoRoutes';  
import detallesPedidoRoutes from './routes/DetallesPedidoRoutes';
import metodosPagoRoutes from './routes/MetodoPagoRoutes';
import estadosRoutes from './routes/EstadoRoutes';
import pagosRoutes from './routes/PagoRoutes';
import notificacionesRoutes from './routes/NotificacionRoutes';
import direccionesEnvioRoutes from './routes/DireccionesEnvioRoutes';
import comentariosResenasProductosRoutes from './routes/ComentarioResenaProductoRoutes';
import cancelacionesRoutes from './routes/CancelacionesRoutes';
import devolucionesRoutes from './routes/DevolucionesRoutes';
import tarjetasCreditoRoutes from './routes/TarjetaCreditoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para manejar datos JSON
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', floreriaRoutes);
app.use('/api', tipoUsuarioRoutes);
app.use('/api', inventarioRoutes);
app.use('/api', categoriasProductosRoutes);
app.use('/api', productoRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', detallesPedidoRoutes);
app.use('/api', metodosPagoRoutes);
app.use('/api', estadosRoutes);
app.use('/api', pagosRoutes);
app.use('/api', notificacionesRoutes);
app.use('/api', direccionesEnvioRoutes);
app.use('/api', comentariosResenasProductosRoutes);
app.use('/api', cancelacionesRoutes);
app.use('/api', devolucionesRoutes);
app.use('/api', tarjetasCreditoRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
