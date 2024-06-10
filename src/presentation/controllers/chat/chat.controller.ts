import { Request, Response } from "express";
import { ChatService } from "./chat.service";
import { HttpStatusCode } from "../../../core";

export class ChatController {
    constructor(private readonly chatService : ChatService){}
    sendMessage = (req : Request, res : Response) => {
         const response = this.chatService.send()
         return res.status(HttpStatusCode.OK).send(response);
    }
}