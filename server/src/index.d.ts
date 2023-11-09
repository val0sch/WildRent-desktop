import User from "./entities/user.entity";

export interface IPayload {
  email: string;
}

export interface IContext {
  user: User | null;
  res: Response;
  // session: any;
}

export interface IUserLogin {
  
}