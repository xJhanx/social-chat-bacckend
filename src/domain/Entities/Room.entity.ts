import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User.entity";
import { UserMessage } from "./UserMessage.entity";

@Entity()
export class Room {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    name: string;

    @ManyToMany(() => User, (user) => user)
    @JoinTable()
    users: User[];
    
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