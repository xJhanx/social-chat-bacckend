import { Router } from "express";
import { AuthRoutes } from "../controllers/auth/auth.routes";
import { AuthMiddleware } from "../middlewares";
import { ChatRouter } from "../controllers/chat/chat.routes";
import { UserRepository } from "../../domain/repositories";
export class Routes {

    static get routes() {
        const router = Router();
        const userRepo = new UserRepository();
        /**
         * @params dependencies
         */
        const authMiddleware = new AuthMiddleware(userRepo);

        router.use('/auth', AuthRoutes.routes);
        router.use(authMiddleware.auth);
        router.use('/chat', ChatRouter.routes);
        return router;
    }
}