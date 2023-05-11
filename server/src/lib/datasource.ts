import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  database: "",
  synchronize: true,
  entities: [],
  logging: ["query", "error"],
});