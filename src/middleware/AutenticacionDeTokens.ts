import jwt from 'jsonwebtoken';
import { Request as ExpressRequest, Response, NextFunction } from 'express';

// Define una interfaz para el usuario
interface User {
    id: number;
    role: string;
    // Añade aquí cualquier otra propiedad que pueda tener 'user'
}

// Extiende la interfaz 'Request' para incluir 'user'
interface Request extends ExpressRequest {
    user?: User;
}

// Middleware de autenticación
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Si no hay token, devolver un error

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Si el token es inválido, devolver un error
        req.user = user;
        next(); // Si todo está bien, continuar a la siguiente función
    });
};

// Middleware de autorización
export const authorizeRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && !roles.includes(req.user.role)) {
            return res.status(403).json({message: "No tienes permiso para realizar esta acción"});
        }
        next();
    };
};