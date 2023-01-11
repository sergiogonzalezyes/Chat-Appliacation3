const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer();


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

module.exports = io;