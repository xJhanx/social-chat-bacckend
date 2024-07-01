import express from 'express';
import { Routes } from './routes/router';
import http from 'http';
import { SocketIoServer } from './socket';
import cors from 'cors';

export class App {

    private readonly app = express();
    constructor(private readonly port: number) { }

    public start = async () => {
        /**CORS */
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST'], 
            allowedHeaders: ['Content-Type', 'Authorization'], 
            credentials: true 
          }));


        /**Midlewares */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        /**Initialize server  */
        const httpServer = await http.createServer(this.app);
        const socket = await SocketIoServer.initialize(httpServer)
        socket.workSocket()
        /**Routes
         * Se usan las rutas depues ya que los routes requieren la intancia del socket
         */
        this.app.use(Routes.routes);
        httpServer.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    }
}