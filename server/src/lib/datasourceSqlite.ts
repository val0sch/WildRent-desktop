import { DataSource } from "typeorm";

import Session from "../entities/session.entity";
import Cart from "../entities/cart.entity";
import Item from "../entities/item.entity";

export default new DataSource({
  type: "sqlite",
  database: "./src/lib/sessionDatabase.sqlite",
  synchronize: true,
  entities: [Session, Cart, Item],
  // logging: ["query", "error"],
});
