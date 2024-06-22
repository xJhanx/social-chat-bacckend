import { Request, Response } from "express"
import { AuthService } from "./auth.service";
import { HttpStatusCode } from "../../../core/http-status-code";
import { CreateUserDto, LoginUserDto } from "./dto";
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    public login = async (req: Request, res: Response) => {
        try {
            const [error, userData] = LoginUserDto.validate(req.body);
            if (error) return res.status(HttpStatusCode.BAD_REQUEST).send({ error });
            const token = await this.authService.login(userData!);
            res.status(HttpStatusCode.OK).send({token});
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    public register = async (req: Request, res: Response) => {
        try {
            const [error, userData] = CreateUserDto.validate(req.body);
            if (error) return res.status(HttpStatusCode.BAD_REQUEST).send({ error });
            const token = await this.authService.register(userData!);
            res.status(HttpStatusCode.OK).send({token});
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
        }
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