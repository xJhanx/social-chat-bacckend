import { Entity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User.entity";
import { Message } from "./Message.entity";
import { Room } from "./Room.entity";

@Entity()
export class UserMessage {


    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => User, user => user.userMessages)
    user: User;

    @ManyToOne(() => Message, message => message.userMessages)
    message: Message;

    @Column()
    room_id: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;



}