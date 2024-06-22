import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, Jwt } from "../../core";
import { UserRepository } from "../../domain/repositories";

export class AuthMiddleware {

    constructor(private readonly userRepository : UserRepository) { }

    auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' });
            if (req.headers.authorization!.split(' ').at(0) !== 'Bearer') {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' });
            }
            const token = req.headers.authorization!.split(' ').at(1);
            if (!token || token == undefined) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized' }); 
            const [statusToken, payload] = Jwt.verify(token!);
            
            const user = await this.userRepository.findOne({ id: payload.id });
            if (!user || !user.status) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized',reloggin:true });
            req.body.sender_id = payload.id;
            
            if (!statusToken) return res.status(HttpStatusCode.UNAUTHORIZED).send({ error: 'No authorized',reloggin:true });
            next();

        } catch (error : any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Internal error' });
        }
    }
}