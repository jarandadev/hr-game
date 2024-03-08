interface ServerToClientEvents {
  receive_msg: (message: Message) => void;
  user_joined: (data: RoomPayload) => void;
  user_left: (data: RoomPayload) => void;

  room_not_found: (data: { message: string }) => void;
  room_full: (data: { message: string }) => void;
  user_exists: (data: { message: string }) => void;
}

interface ClientToServerEvents {
  create_room: (data: RoomPayload) => void;
  join_room: (data: {roomId: string, roomUrl: string, user:User}) => void;
  send_message: (message: Message) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface RoomPayload {
  room: Room;
  user: User;
}
