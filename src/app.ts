
import { envs } from "./config"
import { App } from "./presentation/server"

(() => {
    main()
})()



function main() {
    const server = new App(envs.PORT);
    server.start();
}