
import { envs } from "./config"
import { Server } from "./presentation/server"

(() => {
    main()
})()



function main() {
    const server = new Server(envs.PORT);
    server.start()
}