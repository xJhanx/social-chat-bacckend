
import { envs } from "./config"
import { Server } from "./presentation/server"

(() => {
    main()
})()



function main() {
    /** TODO::
     * @params port,
     * @param routes expected 
     */
    const server = new Server(envs.PORT);
    server.start()
}