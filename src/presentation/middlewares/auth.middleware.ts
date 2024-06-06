import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {

    static auth = (req: Request, res: Response, next: NextFunction) => {
        if(!req.headers.authorization) res.status(403).send('No authorized');
        if(req.headers.authorization!.split(' ').at(0) !== 'Bearer') res.status(403).send('No authorized');
        const token = req.headers.authorization!.split(' ').at(1);
        //todo : validate token
        next();
    }
}