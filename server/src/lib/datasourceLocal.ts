import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import DetailsUser from "../entities/detailsUser.entity";
import Category from "../entities/category.entity";
import Product from "../entities/product.entity";
import Image from "../entities/image.entity";

// To run fixtures change environment variable process.env.DB_PASSWORD and process.env.DB_USERNAME and process.env.DB_NAME with string

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
