import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import DetailsUser from "../entities/detailsUser.entity";
import Category from "../entities/category.entity";
import Product from "../entities/product.entity";
import Image from "../entities/image.entity";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, DetailsUser, Category, Product, Image],
  synchronize: true,
  logging: false,
});
