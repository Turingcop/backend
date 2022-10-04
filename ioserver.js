import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import config from "config.js";
export let docs = {};

dotenv.config();

export function ioServer(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: config.ioCorsOrigin,
            // origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.info("User connected");

        socket.on("create", (room) => {
            socket.leave([...socket.rooms].filter(id => id !== socket.id)[0]);
            if (room) {
                console.log("New user in room: " + room);
                socket.join(room);
            }
        });

        socket.on("doc", (data) => {
            docs[data._id] = { data };
            socket.to(data._id).emit("doc", data);
        });

        socket.on("disconnect", () => {
            if (io.sockets.sockets.size === 0) {
                docs = {};
            }
            console.log(docs);
        });
    });

    return httpServer;
}

