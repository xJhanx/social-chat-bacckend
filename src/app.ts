
import { envs } from "./config"
import { App } from "./presentation/server"
import "reflect-metadata";

(() => {
    main()
})()

function main() {
    const server = new App(envs.PORT);
    server.start();
}