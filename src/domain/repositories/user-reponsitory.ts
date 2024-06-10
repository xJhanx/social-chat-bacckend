import { CreateUserDto } from "../../presentation/controllers/auth/dto/create-user.dto";
import { User } from "../Entities";
import { dataSource } from "../database/type-orm/app-datasource";

export class UserRepository {

    constructor(private user: CreateUserDto) { }
    public async save() {
        try {
            const user = new User();
            user.name = this.user.name;
            user.email = this.user.email;
            user.status = this.user.status;
            user.password = this.user.password;
            await dataSource.manager.save(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public static async find(column: any) {
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

    public static async findOne(column: any) {
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
}