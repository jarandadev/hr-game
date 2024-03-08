import { MAX_PLAYERS, SOCKET_PORT } from "@/config/app"
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as IOServer } from "socket.io"
import { Server } from "socket.io"

export const config = {
  api: {
    bodyParser: false,
  },
}

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}
export default function SocketHandler(_req: NextApiRequest, res: NextApiResponseWithSocket) {

  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: "Socket is already running", socket: `:${SOCKET_PORT}` })
    return
  }

  console.log("Starting Socket.IO server on port:", SOCKET_PORT)
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
  >({ path: "/api/socket", addTrailingSlash: false, cors: { origin: "*" } }).listen(SOCKET_PORT)

  const currentRoom: Room = { id: "", url: "", users: [] }

  io.on("connection", socket => {

    socket.on("create_room", ({ room, user }) => {
      socket.join(room.id);

      currentRoom.id = room.id;
      currentRoom.url = room.url;
      currentRoom.users?.push(user);

      socket.nsp.to(room.id).emit("user_joined", { user, room: currentRoom });
      console.log(`${user.name} created room ${room.id}`);
    });

    socket.on("join_room", ({ roomId, roomUrl, user }) => {
      // TODO: Emit not found room
      const room = io?.sockets.adapter.rooms.get(roomId)
      if (!room) {
        socket.emit("room_not_found", { message: "Room not found" });
        return;
      }
      if (room && room.size >= MAX_PLAYERS) {
        socket.emit("room_full", { message: "Room is full" });
        return;
      }

      // check if name is already taken
      const userExists = currentRoom.users.find((u) => u.name === user.name)
      if (userExists) {
        socket.emit("user_exists", { message: "Name is already taken" });
        return;
      }
      
      socket.join(roomId);

      currentRoom.id = roomId;
      currentRoom.url = roomUrl;
      currentRoom.users?.push(user);

      socket.nsp.to(roomId).emit("user_joined", { user, room: currentRoom });
      console.log(`${user.name} joined room ${roomId}`);
    });

    socket.on("send_message", (data) => {
      const { roomId, username, message, isServer } = data
      socket.to(roomId).emit("receive_msg", data);
      console.log(`${isServer ? "Server" : username} sent message "${message}" to room ${isServer ? currentRoom.id : roomId}`);
    });

    socket.on("disconnect", () => {
      const user = currentRoom.users.find((user) => user.socketId === socket.id);
      if (currentRoom.id === "" || !user) return;

      currentRoom.users = currentRoom.users.filter((user) => user.socketId !== socket.id);

      user.isHost && currentRoom.users.length > 0 && (currentRoom.users[0].isHost = true);

      socket.nsp.to(currentRoom.id).emit("user_left", { user, room: currentRoom });
      console.log(`${socket.id} disconnected in room ${currentRoom.id}`);
    })
  });

  res.socket.server.io = io
  res.status(201).json({ success: true, message: "Socket is started", socket: `:${SOCKET_PORT}` })
}