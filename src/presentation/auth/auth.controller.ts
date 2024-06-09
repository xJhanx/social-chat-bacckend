import { Request, Response } from "express"
import { AuthService } from "./auth.service";
import { SocketIoServer } from "../socket";
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    public login = async (req: Request, res: Response) => {
        //const response = this.authService.login();
        //res.send(response);
        const socket = await SocketIoServer.getInstance();
        socket.io.emit('message', 'hello');

        res.status(200).send('login is runnign');
    }

    public register = (req: Request, res: Response) => {
        const response = this.authService.register();
        res.send(response);
    }

    public logout = (req: Request, res: Response) => {
        const response = this.authService.logout();
        res.send(response);
    }

    public recoverPassword = (req: Request, res: Response) => {
        const response = this.authService.recoverPassword();
        res.send(response);
    }
}