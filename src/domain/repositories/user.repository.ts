import { response } from "express";
import { CreateUserDto } from "../../presentation/controllers/auth/dto/create-user.dto";
import { User } from "../Entities";
import { dataSource } from "../database/type-orm/app-datasource";

export class UserRepository {

    public async save(user: CreateUserDto) {
        try {
            const userModel = new User();
            userModel.name = user.name;
            userModel.email = user.email;
            userModel.status = user.status;
            userModel.password = user.password;

            const response = await dataSource.manager.save(userModel);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async find(column: any) {
        try {
            const user = await dataSource.getRepository(User);
            const response = await user.find({
                where: column
            });
            return response;

        } catch (error) {
            throw error;
        }
    }

    public async findOne(column: any) {
        try {
            const user = await dataSource.getRepository(User);
            const response = await user.findOne({
                where: column
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async findRoomsWithRelations(column: any, relations: string[]): Promise<User[] | null> {
        try {
            const user = await dataSource.getRepository(User);
            const response = await user.find({
                where: column,
                relations
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}