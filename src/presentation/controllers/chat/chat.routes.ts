import { Router } from "express";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

export class ChatRouter {

    static get routes() {
        const router = Router();
        const service = new ChatService();
        const controller = new ChatController(service);
        router.post('/send-message',controller.sendMessage);
        return router;  
    }
}