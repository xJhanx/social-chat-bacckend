import express, { Router } from 'express';
export class Server {

    private readonly app = express();

    constructor(public port: number) {

    }

    public start = () => {

        /**Midlewares */
        this.app.use(express.json()); // raw

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}