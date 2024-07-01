import { Server } from "socket.io";
import http from 'http';

export class SocketIoServer {
    private static instance: SocketIoServer;
    public io: Server;
    public userSockets = new Map(); // Mapear ID de usuario a socket
    private constructor(server: http.Server) {
        this.io = new Server(server,{
            cors: {
            origin: "http://localhost:4200", // <--- Agrega tu origen permitido aquí
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization"],
            credentials: true
        }});
    }


    public static initialize(server: http.Server): SocketIoServer {

        if (!SocketIoServer.instance) {
            return SocketIoServer.instance = new SocketIoServer(server);
        }
        return SocketIoServer.instance;
    }

    public static getInstance(): SocketIoServer {
        if (!SocketIoServer.instance) {
            throw new Error('SocketIoServer has not been initialized');
        }
        return SocketIoServer.instance;
    }

    public async workSocket(){
        /**Middlewares */
        // this.io.use((socket, next) => {
        //     const username = socket.handshake.auth.username;
        //     if (!username) {
        //       return next(new Error("invalid username"));
        //     }
        //     socket.username = username;
        //     next();
        //   });

        await this.io.on('connection', (socket) => {

            console.log('a user connected',socket.id);

            socket.on('disconnect', (socket) => {
                console.log('user disconnected',socket);
            });
        });
        
    }

}


//patron singleton sin instancias
// export class SocketIoServer {
//     public static io : Server;

//     private constructor() {}


//     public static initialize(server: http.Server) : Server {

//         if(!SocketIoServer.io) {
//             return SocketIoServer.io = new Server(server);
//         }
//         return SocketIoServer.io;
//     }

//     public static getInstance() : Server {
//         if(!SocketIoServer.io) {
//             console.log("no esta");
//             throw new Error('SocketIoServer has not been initialized');
//         }
//         return SocketIoServer.io;
//     }

// }