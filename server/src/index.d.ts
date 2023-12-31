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

export interface IUserLogin {
  
}