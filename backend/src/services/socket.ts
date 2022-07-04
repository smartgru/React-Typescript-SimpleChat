import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import { MESSAGE_TYPE } from "../constants";

interface ISocketUser {
  sId: string;
  name: string;
}

interface IMessage {
  from: string;
  sId: string,
  content: string;
  time: string;
  type: string;
}

class User {
  connectedUsers: ISocketUser[] = [];
  messageList: IMessage[] = [];

  handleConnect(socket: Socket, name: string) {
    // Check existing
    const index = this.connectedUsers.findIndex(({ sId }) => sId === socket.id); 
    if (index === -1) {
      this.connectedUsers.push({ sId: socket.id, name });
      const newMessage: IMessage = {
        from: name,
        sId: socket.id,
        content: `${name} joined`,
        time: new Date().toISOString(),
        type: MESSAGE_TYPE.NOTIF,
      };
      this.messageList.push(newMessage);
      socket.broadcast.emit("join", newMessage);
    }
  }

  handleDisconnect(socket: Socket) {
    const index = this.connectedUsers.findIndex(({ sId }) => sId === socket.id);
    if (index !== -1) {
      const { name, sId } = this.connectedUsers[index];
      const newMessage: IMessage = {
        from: name,
        sId,
        content: `${name} left`,
        time: new Date().toISOString(),
        type: MESSAGE_TYPE.NOTIF,
      };
      this.messageList.push(newMessage);
      socket.broadcast.emit("left", newMessage);
      this.connectedUsers.splice(index, 1);
    }
  }

  handleSendMessage(socketIO: Server, socket: Socket, message: string) {
    const user = this.connectedUsers.find(({ sId }) => sId === socket.id);
    if (user) {
      const newMessage: IMessage = {
        from: user.name,
        sId: user.sId,
        content: message,
        time: new Date().toISOString(),
        type: MESSAGE_TYPE.MSG,
      };
      this.messageList.push(newMessage);
      socketIO.emit("message", newMessage);
    }
  }
}

function socketService(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  const SocketUser = new User();

  io.on("connection", (socket) => {
    socket.on("join", ({ name }) => {
      SocketUser.handleConnect(socket, name);
    });

    socket.on("message", ({ message }) => {
      SocketUser.handleSendMessage(io, socket, message);
    });

    socket.on("disconnect", () => {
      SocketUser.handleDisconnect(socket);
    });
  });
}

export default socketService;
