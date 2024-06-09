import express from 'express';
import { Routes } from './routes/router';
import { AuthMiddleware } from './middlewares';
import http from 'http';
import { SocketIoServer } from './socket';
import cors from 'cors';

export class App {

    private readonly app = express();
    constructor(public port: number) { }

    public start = () => {
        /**CORS */
        this.app.use(cors({
            origin: ["http://empresatest:4200"], // <--- Agrega tu origen permitido aquí
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization"],
            credentials: true,
            
        }));
        // set the cors policy

        /**Midlewares */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(AuthMiddleware.auth);
        /**Routes */
        this.app.use(Routes.routes);

        /**Initialize server  */

        const httpServer = http.createServer(this.app);
        const socket = SocketIoServer.initialize(httpServer).io;
        httpServer.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    }
}