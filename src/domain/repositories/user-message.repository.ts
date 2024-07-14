import { Message, User, UserMessage } from "../Entities";
import { dataSource } from "../database/type-orm/app-datasource";

export class UserMessageRepository {

    public async save(user: User, message: Message,room_id : any): Promise<UserMessage> {
        try {
            const userMessage = new UserMessage();
            userMessage.user = user;
            userMessage.message = message;
            userMessage.room_id = room_id;
            const reponse = await dataSource.manager.save(userMessage);
            return reponse;

        } catch (error) {
            throw error;
        }
    }
}