import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Cart from "../entities/cart.entity";

export default class CartService {
  db: Repository<Cart>;
  constructor() {
    this.db = datasource.getRepository("Cart");
  }
    
  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addCart({ state, creation_date, user }: any) {
    return await this.db.save({ state, creation_date, user });
  }

  async updateCart({ id, state, creation_date }: any) {
    return await this.db.update(id, { state, creation_date });
  }

  async deleteCart({ id }: any) {
    return await this.db.delete({ id });
  }

}