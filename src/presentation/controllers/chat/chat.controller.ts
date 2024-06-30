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

    getChats = async (req: Request, res: Response) => {
        try {
            const { sender_id } = req.body;
            const idRooms = await this.chatService.getIdRoomByUser(sender_id);
            const chats = await this.chatService.getChats(sender_id,idRooms!);
            res.status(HttpStatusCode.OK).send(chats);
        } catch (exception) {
            console.log(exception);
            if (exception instanceof HttpException) {
                return res.status(exception.status).send({ error: exception.error });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ exception });
        }
    }

    getConversation = async (req: Request, res: Response) => {
        try {
            const { room_id } = req.body;
            const conversation = await this.chatService.getConversation(room_id);
            res.status(HttpStatusCode.OK).send(conversation);
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
            token: `123456789OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI5N2RjYzBlZS1mOTU3LTQ0N2EtYThmOC02ZmYyM2VhYmRkZjEiLCJpYXQiOiIxMC8yNC8yMDIyIDU6MTM6MTIgUE0iLCJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiI4MDAwMDc4MTM1IiwiZXhwIjoxNjY2NjMxNjUyLCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.3P_AekTcsL7TJ280ehDpn06MfusEd-9EwnCT2LLvgyo`,
            userId: 1,
        }
        console.log("reunning mock token");

        return res.status(200).send(reponse);
    }

    mockGetReports = async (req: Request, res: Response) => {
        // ?api: EXITO
        let responseTest = [
            {
                pin: "0000001",
                fechaSolicitud: "2020-01-01",
                fechaFacturacion: "2020-01-01",
                noFactura: "0000002",
                valorFacturado: "1000 USD",
            },
            {
                pin: "0000002",
                fechaSolicitud: "2020-01-01",
                fechaFacturacion: "2020-01-01",
                noFactura: "0000002",
                valorFacturado: "1000 USD",
            },
            {
                pin: "0000003",
                fechaSolicitud: "2020-01-01",
                fechaFacturacion: "2020-01-01",
                noFactura: "0000002",
                valorFacturado: "1000 USD",
            },
        ]
        console.log("return mockGetReports");

        return res.status(500).json(responseTest);
    }
}