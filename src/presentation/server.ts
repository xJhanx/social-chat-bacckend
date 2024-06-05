import express from 'express';
import { Routes } from './router';
export class Server {

    private readonly app = express();

    constructor(public port: number) {

    }

    public start = () => {

        /**Midlewares */
        this.app.use(express.json()); 

        /**Routes */
        this.app.use(Routes.routes);
        
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}