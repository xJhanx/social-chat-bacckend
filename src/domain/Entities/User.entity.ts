import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { UserMessage } from "./UserMessage.entity";
import { Room } from "./Room.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
    })
    name: string;

    @Column({
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
    })
    password: string;

    @Column({
        type: "boolean",
    })
    status: boolean;

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

    @OneToMany(() => UserMessage, userMessage => userMessage.user)
    userMessages: UserMessage[];
    
    @ManyToMany(() => Room, (room) => room.users)
    rooms : Room[];
}
