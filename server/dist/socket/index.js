"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketLogic = void 0;
const messages = {
    general: [],
    channel1: [],
    channel2: [],
    channel3: [],
};
let allUsers = [];
const socketLogic = (socket, io) => {
    socket.on("join server", ({ username }) => {
        const user = { username, id: socket.id };
        allUsers.push(user);
        io.emit("new user", allUsers);
    });
    socket.emit("your id", socket.id);
    socket.on("join room", (roomName) => {
        socket.join(roomName);
        socket.emit("joined", roomName);
    });
    socket.on("send message", ({ body, to, user }) => {
        socket.to(to).emit("message", { body, user, id: socket.id, room: to });
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected");
        allUsers = allUsers.filter(({ id }) => id !== socket.id);
        io.emit("new user", allUsers);
    });
};
exports.socketLogic = socketLogic;
//# sourceMappingURL=index.js.map