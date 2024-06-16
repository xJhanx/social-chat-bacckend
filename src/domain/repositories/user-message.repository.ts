import { Message, User, UserMessage } from "../Entities";
import { dataSource } from "../database/type-orm/app-datasource";

export class UserMessageRepository {

    public async save(user: User, message: Message) {
        try {
            const userMessage = new UserMessage();
            userMessage.user = user;
            userMessage.message = message;
            const reponse = await dataSource.manager.save(userMessage);
            return reponse;

        } catch (error) {
            throw error;
        }
    }
}