import User from "./entities/user.entity";
import Session from "./entities/session.entity";

export interface IPayload {
  email: string;
}

export interface IContext {
  user: User | null;
  res: Response;
  session: Session | null;
}

export interface IUserLogin {}

// Interface Socket.io

interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}
interface ServerToClientEvents {
  users: (users: { userID: string; userEmail: string }[]) => void;
  userConnected: ({ userID: string, userEmail: string }) => void;
  userDisconnected: (userID: string) => void;
  privateMessage: ({ messageData: MessageData, from: string }) => void;
}

interface ClientToServerEvents {
  privateMessage: (
    { content, to }: { messageData: MessageData; to: string },
    callback: ({
      content,
      from,
    }: {
      messageData: MessageData;
      from: string;
    }) => void
  ) => void;
}

interface InterServerEvents {}

interface SocketData {
  userEmail: string;
}
