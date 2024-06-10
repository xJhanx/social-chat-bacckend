import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);

        router.post('/login', controller.login);
        router.post('/register', controller.register);
        router.get('/logout', controller.logout);
        router.get('/recoverPassword', controller.recoverPassword);

        return router;
    }
}