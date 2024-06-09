import { DataSource } from "typeorm";
import { User } from "../../Entities";
import { envs } from "../../../config";


export const dataSource = new DataSource({
    type: "postgres",
    host: envs.HOST_DB,
    port: envs.PORT_DB,
    username: envs.USER_DB,
    password: envs.PASSWORD_DB,
    database: envs.NAME_DB,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});

