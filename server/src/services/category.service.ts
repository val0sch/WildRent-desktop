import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Category from "../entities/category.entity";

export default class CategoryService {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository("Category");
  }

  async listCategory() {
    return await this.db.find();
  }

  async findByLabel(label: string) {
    return await this.db.findOneBy({ label });
  }
  
  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addCategory({ label }: any) {
    return await this.db.save({ label });
  }

  async updateCategory({ id, label }: any) {
    return await this.db.update(id, { label });
  }
  
  async deleteCategory({ id }: any) {
    return await this.db.delete({ id });
  }

}
