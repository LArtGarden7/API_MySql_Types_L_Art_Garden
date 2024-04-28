import multer from 'multer';
import { Request } from 'express';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
    cloud_name: 'dnvgltpvt',
    api_key: '396248594926859',
    api_secret: 'DNp4OEZb7gYxcW2AByb2eG6y9n0'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'Imagenes',
        format: async (req: Request, file: Express.Multer.File) => 'png', // supports promises as well
        public_id: (req: Request, file: Express.Multer.File) => file.originalname,
    } as any, // Add 'as any' to bypass TypeScript's type checking
});

export default multer({ storage });