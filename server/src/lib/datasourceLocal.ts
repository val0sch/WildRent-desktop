import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import DetailsUser from "../entities/detailsUser.entity";
import Category from "../entities/category.entity";
import Product from "../entities/product.entity";
import Image from "../entities/image.entity";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wildrent",
  entities: [User, DetailsUser, Category, Product, Image],
  synchronize: true,
  logging: false,
});
