"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketLogic = void 0;
let allUsers = [];
const socketLogic = (socket, io) => {
    socket.on("join server", ({ user }) => {
        const newUser = { user, id: socket.id, roomName: "general" };
        allUsers.push(newUser);
        io.emit("new user", allUsers);
    });
    socket.emit("your id", socket.id);
    socket.on("join room", (roomName) => {
        allUsers.map((user) => {
            if (user.id === socket.id) {
                user.roomName = roomName;
            }
        });
        io.emit("new user", allUsers);
        socket.join(roomName);
        socket.emit("joined", roomName);
    });
    socket.on("send message", ({ body, to, user, id, isPrivate }) => {
        if (isPrivate) {
            socket.emit("message", { body, user, id: socket.id, room: to });
            io.to(to).emit("message", {
                body,
                user,
                id: socket.id,
                room: id,
                isPrivate,
            });
        }
        else {
            io.to(to).emit("message", {
                body,
                user,
                id: socket.id,
                room: to,
                isPrivate,
            });
        }
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected");
        allUsers = allUsers.filter(({ id }) => id !== socket.id);
        io.emit("new user", allUsers);
    });
};
exports.socketLogic = socketLogic;
//# sourceMappingURL=index.js.map