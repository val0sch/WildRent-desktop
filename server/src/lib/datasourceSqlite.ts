import { DataSource } from "typeorm";

import Session from "../entities/session.entity"

export default new DataSource({
  type: "sqlite",
  database: "./src/lib/sessionDatabase.sqlite",
  synchronize: true,
  entities: [Session],
  logging: ["query", "error"],
});
