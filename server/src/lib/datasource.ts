import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import DetailsUser from "../entities/detailsUser.entity";
import Category from "../entities/category.entity";
import Cart from "../entities/cart.entity";
import Item from "../entities/item.entity";
import Product from "../entities/product.entity";
import Image from "../entities/image.entity";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wildrent",
  entities: [User, DetailsUser, Category, Cart, Item, Product, Image ],
  synchronize: true,
  logging: false,
});