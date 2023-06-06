import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import User from "../entities/user.entity";

import * as jwt from "jsonwebtoken";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository("User");
  }

  async listUsers() {
    return await this.db.find({ relations: ['detailsUser'] });
  }

  async findByEmail(email: string) {
    return await this.db.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.db.findOne({ where: { id }, relations: ['detailsUser'] });
  }

  async addUser({ email, password, isAdmin, detailsUser }: any) {
    return await this.db.save({ email, password, isAdmin, detailsUser });
  }

  async updateUser({ id, email, password, isAdmin }: any) {
    return await this.db.update(id, { email, password, isAdmin });
  }
  
  async deleteUser({ id }: any) {
    return await this.db.delete({ id });
  }

  async getAndCheckToken(authorization: string | undefined) {
    let payload = null;
    if (authorization) {
      try {
        let token = authorization?.split(" ")[1];
        if (token) {
          payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
        }
      } catch (err) {
        console.log("error", err);
      }
    }
    return payload;
  }
}
