import { Repository } from "typeorm";
import datasourceSqlite from "../lib/datasourceSqlite";
import Session from "../entities/session.entity";
export default class SessionService {
  dbSqlite: Repository<Session>;
  constructor() {
    this.dbSqlite = datasourceSqlite.getRepository(Session);
  }

  async createSession(userId?: string | undefined) {
    return await this.dbSqlite.save({ userId });
  }

  async findSession(id: string) {
    return await this.dbSqlite.findOne({
      where: { id },
      relations: { cart: { items: true } },
    });
  }
}
