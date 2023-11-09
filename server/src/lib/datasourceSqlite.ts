import { DataSource } from "typeorm";

import Session from "../entities/session.entity"
import CartSession from "../entities/cartSession.entity";

export default new DataSource({
  type: "sqlite",
  database: "./src/lib/sessionDatabase.sqlite",
  synchronize: true,
  entities: [Session, CartSession],
  logging: ["query", "error"],
});
