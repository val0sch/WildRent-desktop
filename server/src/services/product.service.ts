import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Product from "../entities/product.entity";

export default class ProductService {
  db: Repository<Product>;
  constructor() {
    this.db = datasource.getRepository("Product");
  }

  async listProduct() {
    return await this.db.find({ relations: ['category'] });
  }

  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addProduct({ name, price, description, isAvailable, size, stock, category, item }: any) {
    return await this.db.save({ name, price, description, isAvailable, size, stock, category, item });
  }

  async updateProduct({ id, name, price, description, isAvailable, size, stock, category, item }: any) {
    return await this.db.update(id, { name, price, description, isAvailable, size, stock, category, item });
  }
  
  async deleteProduct({ id }: any) {
    return await this.db.delete({ id });
  }

}
