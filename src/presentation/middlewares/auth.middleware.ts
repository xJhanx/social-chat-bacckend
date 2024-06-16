import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, Jwt } from "../../core";

export class AuthMiddleware {

    static auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' });
            if (req.headers.authorization!.split(' ').at(0) !== 'Bearer') {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' });
            }
            const token = req.headers.authorization!.split(' ').at(1);
            if (!token || token == undefined) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' }); 
            const [statusToken, payload] = Jwt.verify(token!);
            
            /**
             * TODO: revisar que usuario en el token exista y agregarlo al body de la petición
             */
            if (!statusToken) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized',reloggin:true });
            next();

        } catch (error : any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Internal error' });
        }
    }
}