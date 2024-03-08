import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface SocketStore {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  room: Room
  chat: Message[]
  setSocket: (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => void
  setRoom: (room: Room) => void
  leaveRoom: (user: User) => void
  sendMessage: (message: Message) => void
  receiveMessage: (message: Message) => void
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  room: { id: "", url: "", users: [] },
  chat: [],
  setSocket: (socket) => set({ socket }),
  setRoom: (room) => set({ room }),
  leaveRoom: (user) => set((store) => {
    if (!store.room) return {}
    const room: Room = { ...store.room, users: store.room.users?.filter((u) => u.socketId !== user.socketId) }
    return { room }
  }),
  sendMessage: (message) => set((store) => {
    store.socket?.emit("send_message", message);
    const chat = [...store.chat, message]
    return { chat }
  }),
  receiveMessage: (message) => set((store) => {
    const chat = [...store.chat, message]
    return { chat }
  }),
}))