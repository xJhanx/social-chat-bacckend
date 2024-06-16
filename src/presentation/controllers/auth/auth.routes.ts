import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../../../domain/repositories";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        const userRepository = new UserRepository();
        const authService = new AuthService(userRepository);
        const controller = new AuthController(authService);

        router.get('/logout', controller.logout);
        router.get('/recoverPassword', controller.recoverPassword);
        router.post('/register', controller.register);
        router.post('/login', controller.login);

        return router;
    }
}