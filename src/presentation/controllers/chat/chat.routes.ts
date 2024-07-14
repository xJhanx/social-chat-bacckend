import { Router } from "express";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { MessageRepository } from "../../../domain/repositories/message.repository";
import { RoomRepository, UserRepository } from "../../../domain/repositories";
import { UserMessageRepository } from "../../../domain/repositories/user-message.repository";
import { SocketIoServer } from "../../socket";

export class ChatRouter {

    static get routes() {
        const router = Router();
        
        /**Socket */
        const socket = SocketIoServer.getInstance();
        /** repositories */
        const userRepo = new UserRepository();
        const userMessageRepo = new UserMessageRepository();
        const roomRepo = new RoomRepository();
        const messageRepo = new MessageRepository();
        /** services */
        const service = new ChatService(messageRepo,userRepo, userMessageRepo, roomRepo,socket);
        /** controller */
        const controller = new ChatController(service,userRepo);
        router.post('/send-message', controller.sendMessage);
        router.post('/get-chats', controller.getChats);
        router.post('/get-conversation', controller.getConversation);
        router.post('/get-contacts-by-name', controller.getContactsByName);
        //mi mock para gases del oriente
        router.post('/mock-send-order', controller.mockOrder);
        router.post('/mock-token', controller.mockToken);
        router.post('/get-reports', controller.mockGetReports);

        return router;
    }
}