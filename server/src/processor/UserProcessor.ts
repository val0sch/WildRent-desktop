import { IProcessor } from 'typeorm-fixtures-cli';
import User from "../entities/user.entity";
import { hash } from "argon2";

export default class UserProcessor implements IProcessor<User> {
  async preProcess(name: string, object: any): Promise<any> {
    if (object.password) {
      const hashedPassword = await hash(object.password);
      return { ...object, password: hashedPassword };
    }
    return object;
  }
}
