import { Router } from "express";
import { AuthRoutes } from "../controllers/auth/auth.routes";
export class Routes {

    static get routes() {
        const router = Router();
        router.use('/auth', AuthRoutes.routes);
        return router;
    }
}