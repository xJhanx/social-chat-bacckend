import { Request, Response } from "express"
import { AuthService } from "./auth.service";
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    public login = (req: Request, res: Response) => {
        const response = this.authService.login();
        res.send(response);
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