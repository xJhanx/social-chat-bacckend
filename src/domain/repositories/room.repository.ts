import { In } from "typeorm";
import { User, UserMessage } from "../Entities";
import { Room } from "../Entities/Room.entity";
import { dataSource } from "../database/type-orm/app-datasource";

export class RoomRepository {

    public async create(name: string) {
        try {

            if (!name) throw new Error('No se ha podido crear la sala');
            const roomModel = new Room();
            roomModel.name = name;
            const response = await dataSource.manager.save(roomModel);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async findOne(column: any) {
        try {
            const roomModel = await dataSource.manager.getRepository(Room);
            return await roomModel.findOne({
                where: column
            });
        } catch (error) {
            throw error;
        }
    }

    public async findOneWithRelations(ids: any[], relations: string[]) : Promise<Room[] | null> {
        try {
            const roomModel = await dataSource.manager.getRepository(Room);
            return await roomModel.find({
                where: {
                    id : In(ids)
                },
                relations
            });
        } catch (error) {
            throw error;
        }
    }

    public async saveList(room: Room, users: User[]) : Promise<Room> {
        try {
            const roomModel = await this.findOne({ id: room.id });
            if (!roomModel) throw new Error('No se ha podido encontrar la sala');
            roomModel.users = users;
            const response = await dataSource.manager.save(roomModel);
            return response;
        } catch (error) {
            throw error;
        }
    }
}