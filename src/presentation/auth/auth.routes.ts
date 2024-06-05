import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        const controller = new AuthController();

        router.get('/login', controller.login);
        router.get('/register', controller.register);
        router.get('/logout', controller.logout);
        router.get('/recoverPassword', controller.recoverPassword);

        return router;
    }
}