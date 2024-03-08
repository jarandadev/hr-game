"use client"

import { useSocketStore } from "@/store/store";
import { Chat } from "./Chat"
import { Button } from "./ui/Button";
import { RoomUrl } from "./RoomUrl";
import { UsersList } from "./UsersList";
import { MAX_PLAYERS, MIN_PLAYERS } from "@/config/app";
import { getUser } from "@/lib/utils";

export const Room = () => {
  const { socket, room } = useSocketStore();
  const size = room.users.length;
  const isGameReady: boolean = size >= MIN_PLAYERS && size <= MAX_PLAYERS;
  const user = getUser(socket?.id!, room.users);
  return (
    <div className="grid grid-cols-2 gap-4 h-[400px]">
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          <RoomUrl roomUrl={room.url} />
          <UsersList users={room.users} />
        </div>
        {user?.isHost && (
          <div>

          <Button disabled={!isGameReady} className="border p-2 rounded-xl w-full mb-0">{isGameReady ? "Start Game" : `${MIN_PLAYERS - room.users.length} players left to start`}</Button>
          </div>
        )}
      </div>
      <Chat />
    </div>
  )
}
