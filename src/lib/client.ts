import { SOCKET_PORT } from "@/config/app"
import { io } from "socket.io-client"

export default function socketClient() {
  const socket = io(`:${SOCKET_PORT}`, { 
    path: "/api/socket", 
    addTrailingSlash: false,

  })

  socket.on("connect_error", async () => {
    await fetch("/api/socket")
  })

  return socket
}