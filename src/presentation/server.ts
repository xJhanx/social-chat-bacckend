import express from 'express';
import { Routes } from './routes/router';
import { AuthMiddleware } from './middlewares';
export class Server {

    private readonly app = express();
    constructor(public port: number) {}

    public start = () => {
        /**CORS */
        // set the cors policy
        
        /**Midlewares */
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(AuthMiddleware.auth);
        /**Routes */
        this.app.use(Routes.routes);
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}