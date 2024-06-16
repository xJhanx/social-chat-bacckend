import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { UserMessage } from "./UserMessage.entity";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
    })
    text: string;

    @Column({
        type: "boolean",
        default: () => 'false',
    })
    viewed: boolean;

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

    @OneToMany(() => UserMessage, userMessage => userMessage.message)
    userMessages: UserMessage[];
}