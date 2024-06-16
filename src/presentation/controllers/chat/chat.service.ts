import { HttpException } from "../../../core";
import { MessageRepository, RoomRepository, UserMessageRepository, UserRepository } from "../../../domain/repositories";
import { MessageDto } from "./dto";

export class ChatService {

    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly userRepository: UserRepository,
        private readonly userMessageRepository: UserMessageRepository,
        private readonly roomRepository: RoomRepository) { }
    public async send(data: MessageDto) {
        try {
            const messageCreated = await this.messageRepository.save(data.message);
            const userModel = await this.userRepository.findOne({ id: data.sender_id });
            if (!userModel) throw new HttpException('user not found', 404);

            const userMessageCreated = await this.userMessageRepository.save(userModel, messageCreated);

            if(!data.room_id){ // si no hay un Id de sala
                const userSender = await this.userRepository.findOne({ id: data.sender_id });
                const userRecipient = await this.userRepository.findOne({ id: data.recipient_id });                
                if(!userRecipient || !userSender) throw new HttpException('users not found', 404);
                const nameRoom = `${userSender.name}-${userRecipient.name}`;
                const roomCreated = await this.roomRepository.create(nameRoom);
                const roomListCreated = await this.roomRepository.saveList(roomCreated,[userSender, userRecipient]);
                return roomListCreated;
            }
            return userMessageCreated;
        } catch (error) {
            throw error;
        }
    }
}