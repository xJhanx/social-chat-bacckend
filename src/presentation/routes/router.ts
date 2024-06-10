import { Router } from "express";
import { AuthRoutes } from "../controllers/auth/auth.routes";
import { AuthMiddleware } from "../middlewares";
import { ChatRouter } from "../controllers/chat/chat.routes";
export class Routes {

    static get routes() {
        const router = Router();
        router.use('/auth', AuthRoutes.routes);
        router.use(AuthMiddleware.auth);
        router.use('/chat', ChatRouter.routes);
        return router;
    }
}