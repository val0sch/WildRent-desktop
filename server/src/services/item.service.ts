import { Repository } from "typeorm";
import datasource from "../lib/datasourceSqlite";
import Item from "../entities/item.entity";
import Cart from "../entities/cart.entity";

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

  async addItem({ quantity, start_rent_date, due_rent_date, isFavorite, cart, productId }: any) {
    return await this.db.save({ quantity, start_rent_date, due_rent_date, isFavorite, cart, productId });
  }

  async updateItem({ id, quantity, start_rent_date, due_rent_date, isFavorite, cart, productId }: any) {
    return await this.db.update(id, { quantity, start_rent_date, due_rent_date, isFavorite, cart, productId: productId.id });
  }
  
  async deleteItem({ id }: any) {
    return await this.db.delete({ id });
  }

  async getItemsByCart({cartId}: any ) {
    return await this.db.find( { where: { cart: cartId } });
  }

}