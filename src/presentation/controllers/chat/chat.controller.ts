import { Request, Response } from "express";
import { HttpException, HttpStatusCode } from "../../../core";
import { MessageDto } from "./dto";
import { ChatService } from "./chat.service";

export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    sendMessage = async (req: Request, res: Response) => {
        try {
            const [error, data] = MessageDto.validate(req.body);

            if (error) return res.status(HttpStatusCode.BAD_REQUEST).send({ error });

            const response = await this.chatService.send(data!);
            return res.status(HttpStatusCode.OK).send({ response });

        } catch (exception) {
            console.log(exception);
            if (exception instanceof HttpException) {
                return res.status(exception.status).send({ error: exception.error });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ exception });
        }
    }

    mockOrder = async (req: Request, res: Response) => {
        // ?api: EXITO
        // let responseTest = {
        //     ReceiptNum: "any",
        //     ResponseCode: "00",
        //     AdditionalRspData: "any",
        //     AuthorizationRspCode: "any",
        // }
        // return res.status(HttpStatusCode.OK).send(responseTest);

        //? api COLOMBIANA
        const response = {
            "code": 200,
            "message": "La orden con PIN 6cc5078c6d9087cdf077 se registro y aprobo exitosamente"
        }
        return res.status(200).send(response);
    }

    mockToken = async (req: Request, res: Response) => {
        // ?api: EXITO
        // let responseTest =
        //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiOGU0NTExYi1lY2U5LTQ2OWQtOGMzZC00OWI0OTdlZjUzODQiLCJleHAiOjE1MjYwNzU2MDEuMCwiaWF0IjoxNTI1OTg5MjAwLjg5OTcyNzh9.k-2te-7r40E3etwiJJ8hsPlqbe8FISuNeA73Dd38xCQ";
        //return res.status(200).send("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiOGU0NTExYi1lY2U5LTQ2OWQtOGMzZC00OWI0OTdlZjUzODQiLCJleHAiOjE1MjYwNzU2MDEuMCwiaWF0IjoxNTI1OTg5MjAwLjg5OTcyNzh9.k-2te-7r40E3etwiJJ8hsPlqbe8FISuNeA73Dd38xCQ");


        //? api COLOMBIANA
        const reponse = {
            token : `123456789OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZ
                XNzVG9rZW4iLCJqdGkiOiI5N2RjYzBlZS1mOTU3LTQ0N2EtYThmOC02ZmYyM2VhYmRkZjEiLCJpYXQiOi
                IxMC8yNC8yMDIyIDU6MTM6MTIgUE0iLCJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiI4MDAwMDc4MTM1Iiw
                iZXhwIjoxNjY2NjMxNjUyLCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNl
                cnZpY2VQb3N0bWFuQ2xpZW50In0.3P_AekTcsL7TJ280ehDpn06MfusEd-9EwnCT2LLvgyo`,
            userId: 1,
        }
        return res.status(200).send(reponse);
    }
}