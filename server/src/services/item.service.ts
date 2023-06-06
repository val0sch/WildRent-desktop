import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Item from "../entities/item.entity";

export default class ItemService {
  db: Repository<Item>;
  constructor() {
    this.db = datasource.getRepository("Item");
  }

  async listItem() {
    return await this.db.find({ relations: ['cart', 'product'] });
  }

  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addItem({ quantity, start_rent_date, due_rent_date, isFavorite, cart, product }: any) {
    return await this.db.save({ quantity, start_rent_date, due_rent_date, isFavorite, cart, product });
  }

  async updateItem({ id, quantity, start_rent_date, due_rent_date, isFavorite, cart, product }: any) {
    return await this.db.update(id, { quantity, start_rent_date, due_rent_date, isFavorite, cart, product });
  }
  
  async deleteItem({ id }: any) {
    return await this.db.delete({ id });
  }

}
