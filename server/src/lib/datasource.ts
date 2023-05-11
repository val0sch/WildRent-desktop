import { DataSource } from "typeorm";
import User from "../entities/user.entity";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wildrent",
  entities: [User],
  synchronize: true,
  logging: false,
});