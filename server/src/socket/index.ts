import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IAllUsers } from "src/interfaces/socket.interfaces";

const messages = {
  general: [],
  channel1: [],
  channel2: [],
  channel3: [],
};
let allUsers: IAllUsers[] = [];
export const socketLogic = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  // USER JOINS SERVER
  socket.on("join server", ({ username }) => {
    const user = { username, id: socket.id };
    allUsers.push(user); // Add user to users array
    io.emit("new user", allUsers);
  });
  socket.emit("your id", socket.id);

  // ON JOINING ROOM
  socket.on("join room", (roomName) => {
    socket.join(roomName);
    socket.emit("joined", roomName);
  });

  // ON RECIEVING MESSAGE FROM CLIENT
  socket.on("send message", ({ body, to, user }) => {
    socket.to(to).emit("message", { body, user, id: socket.id, room: to });
    socket.emit("message", { body, user, id: socket.id, room: to });
  });
  // ON USER DISCONNECTING
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    allUsers = allUsers.filter(({ id }) => id !== socket.id);
    io.emit("new user", allUsers);
  });
};
