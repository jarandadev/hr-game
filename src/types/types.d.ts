interface Message {
  roomId: string;
  username?: string;
  message: string;
  isServer: boolean;
}

interface User {
  socketId: string;
  name: string;
  isHost: boolean;
}

interface Player {
  user: User;
  isLeader: boolean;
}

interface Room {
  id: string;
  url: string;
  users: User[];
}