import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173/"
    }
})

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("usr connected", socket.id);
})

const userId = socket.handshake.query.userId;
if (userId) userSocketMap[userId] = socket.id;


socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", object.keys(userSocketMap));

})

export { server, userSocketMap, io }