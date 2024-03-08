"use client";

import { useEffect, useState } from 'react';
import socketClient from "@/lib/client";
import { useSocketStore } from "@/store/store";
import { generateRoomId } from "../lib/utils";
import { Room } from "@/components/Room";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Home() {
  const { socket, room, setSocket, setRoom, sendMessage } = useSocketStore();
  const [roomIdToJoin, setRoomIdToJoin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket?.on("room_not_found", (data) => { console.log(data.message); setError(data.message) });
    socket?.on("room_full", (data) => setError(data.message));
    socket?.on("user_exists", (data) => setError(data.message));
  }, [socket]);

  // Initialize socket
  useEffect(() => {
    setSocket(socketClient());
    const urlParams = new URLSearchParams(window.location.search);
    const roomIdParam = urlParams.get("r");
    if (roomIdParam) {
      setRoomIdToJoin(roomIdParam);
    }
  }, [setSocket]);

  // Handle user join and left
  useEffect(() => {
    const handleUserEvent = ({ user: userFromEvent, room: roomUpdated }: RoomPayload, action: 'joined' | 'left') => {
      const message: Message = {
        roomId: room.id!,
        message: `${userFromEvent.name} ${action} the room`,
        isServer: true,
      };
      sendMessage(message);
      setRoom(roomUpdated)
    }

    socket?.on("user_joined", (data) => handleUserEvent(data, 'joined'));
    socket?.on("user_left", (data) => handleUserEvent(data, 'left'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, sendMessage]);


  // Create or join room
  const handleRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value.trim();
    if (username === "" || !socket?.id) return;

    const user: User = { socketId: socket.id, name: username, isHost: false };
    const roomUrl = new URL(window.location.href)

    if (roomIdToJoin) {
      roomUrl.searchParams.set('r', roomIdToJoin)
      socket?.emit("join_room", { roomId: roomIdToJoin, roomUrl: roomUrl.href, user });
    } else {
      const roomIdToCreate = generateRoomId();
      roomUrl.searchParams.set('r', roomIdToCreate)
      user.isHost = true

      const room: Room = { id: roomIdToCreate, url: roomUrl.href, users: [user] }

      socket?.emit("create_room", { room, user });
    }
  };

  return (
    <main className="grid place-content-center h-screen w-full">
      {room.id !== "" ? <Room /> : (
        <div className='relative'>
          <form onSubmit={handleRoom} className="flex gap-2 w-[400px]">
            <Input name="username" placeholder="Username" />
            <Button className="whitespace-nowrap" type="submit">{roomIdToJoin ? "Join Room" : "Create Room"}</Button>
          </form>
          {error && <p className='absolute text-sm text-red-400'>{error}</p>}
        </div>
      )}
    </main>
  );
}