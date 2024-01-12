import { IProcessor } from 'typeorm-fixtures-cli';
import User from "../entities/user.entity";
import { hash } from "argon2";

export default class UserProcessor implements IProcessor<User> {
  async preProcess(name:string, object: any): Promise<any> {

    const hashedPassword = await hash(object.password);
    const newEmail = object.email.toLowerCase();

    object.password = hashedPassword;
    object.email = newEmail;
    
    return object;
  }
}
