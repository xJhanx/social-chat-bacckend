
import { envs } from "./config"
import { dataSource } from "./domain/database/type-orm/app-datasource";
import { App } from "./presentation/server"
import "reflect-metadata";

(() => {
    main()
})()

async function main() {
    const server = new App(envs.PORT);
    dataSource.initialize().then(() => {
        console.table({
            "Database": "Online",
        });
        server.start();
    }).catch(err => {
        console.table({ "Database": "Offline", "Consecuencias": "El servidor no se puedo inicializar", ...err });
        throw err;
    });
}