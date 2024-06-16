export class MessageDto {
    constructor(public message: string, public room_id: string, public sender_id?: number , public recipient_id?: number) { }
    public static validate(bodyRequest: any): [string | null, MessageDto | null] {
        const { message, sender_id, room_id , recipient_id } = bodyRequest;

        if (!message || message == "") {
            return ["message is required", null];
        }
        if (message.length > 100) {
            return ["message is too long", null];
        }

        if(sender_id && isNaN(sender_id)) {
            return ["sender_id and must be a number", null];
        }

        if(recipient_id && isNaN(recipient_id)) {
            return ["recipient_id and must be a number", null];
        }

        if (room_id && !isNaN(room_id)) {
            return ["room_id and must be a number", null];
        }
        
        return [null, new MessageDto(message, room_id,sender_id,recipient_id)];
    }
}