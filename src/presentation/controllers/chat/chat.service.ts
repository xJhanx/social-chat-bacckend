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

            if (!data.room_id) { // si no hay un Id de sala
                const userSender = await this.userRepository.findOne({ id: data.sender_id });
                const userRecipient = await this.userRepository.findOne({ id: data.recipient_id });
                console.log(userRecipient, userSender);
                if (!userRecipient || !userSender) throw new HttpException('users not found', 404);
                const nameRoom = `${userSender.name}-${userRecipient.name}`;
                const roomCreated = await this.roomRepository.create(nameRoom);
                const roomListCreated = await this.roomRepository.saveList(roomCreated, [userSender, userRecipient]);
                return roomListCreated;
            }
            return userMessageCreated;
        } catch (error) {
            throw error;
        }
    }
    public async getIdRoomByUser(id: number) {
        const users = await this.userRepository.findRoomsWithRelations({ id: id }, ['rooms']);
        if (!users) return [];
        const rooms = users?.flatMap(user => {
            return user.rooms.map(room => room.id);
        });
        return rooms;
    }

    public async getConversation(room_id: number) {
        const data = await this.roomRepository.findOneWithRelations([room_id],
            ['users',
                'users.userMessages',
                'users.userMessages.message',
            ]);
        let conversation = data?.flatMap(room => {
            return room.users.flatMap(user => {
                return user.userMessages.flatMap(userMessage => {
                    return {
                        room_id : room.id,
                        messages : {
                            user_id : user.id,
                            message_id : userMessage.id,
                            viewed : userMessage.message.viewed,
                            name_user : user.name,
                            message : userMessage.message.text,
                            created_at : userMessage.message.createdAt,
                            updated_at : userMessage.message.updatedAt
                        }
                    }
                })
            })
        });
        // Ordenar por created_at
        if(!conversation) return [];
        const sortedConversation = conversation
        .sort((a, b) => new Date(a.messages.created_at).getTime() - new Date(b.messages.created_at).getTime());

        // const conversation = data?.map(room => {
        //     return {
        //         room_id : room.id,
        //         users : room.users.map(user => {
        //             return {
        //                 user_id: user.id,
        //                 name: user.name,
        //                 messages : user.userMessages.flatMap(userMessage => {
        //                     return {
        //                         message : userMessage.message
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // })
        return sortedConversation;
    }

    public async getChats(id_user: number, id_rooms: number[]) {
        const rooms = await this.roomRepository.findOneWithRelations(id_rooms, ['users']);
        const chats = rooms?.flatMap(room => {
            return room.users
                .filter(user => user.id !== id_user)
                .map(user => ({
                    id: user.id,
                    name: user.name,
                    room: room.id
                }));
        });
        if(!chats) return [];
        let noDuplicateChats : any[] = [];

        chats.map(chat => {
            if(noDuplicateChats.findIndex((element) => element.id === chat.id) === -1){
                noDuplicateChats.push(chat)
            };
        });        
        return noDuplicateChats;
    }

}