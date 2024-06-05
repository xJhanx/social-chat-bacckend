import { Request, Response } from "express"

export class AuthController {
    public login = (req: Request, res: Response) => {
        console.log(req.body)
        res.send("login is runnign");
    }

    public register = (req: Request, res: Response) => {
        console.log(req.body)
        res.send("register is runnign");
    }

    public logout = (req: Request, res: Response) => {
        console.log(req.body)
        res.send("logout is runnign");
    }

    public recoverPassword = (req: Request, res: Response) => {
        console.log(req.body)
        res.send("recoverPassword is runnign");
    }
}