import { response } from "express";
import { Message } from "../Entities";
import { HttpException } from "../../core";

import { MessageDto } from "../../presentation/controllers/chat/dto";
import { dataSource } from "../database/type-orm/app-datasource";


export class MessageRepository {
    public async save(message: string) : Promise<Message> {
        try {
            const messageModel = new Message();
            messageModel.text = message;
            const messageCreated = await dataSource.manager.save(messageModel);
            return messageCreated;

        } catch (error) {
            throw error;
        }
    }
}