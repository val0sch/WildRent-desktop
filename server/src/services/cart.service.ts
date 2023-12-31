import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Cart from "../entities/cart.entity";
import { CartRegister } from "../graphql/graphql";

export default class CartService {
  db: Repository<Cart>;
  constructor() {
    this.db = datasource.getRepository("Cart");
  }
    
  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addCart({ state, creation_date }: CartRegister) {
    return await this.db.save({ state, creation_date });
  }

  async updateCart(id:string, { state, creation_date }: CartRegister) {
    return await this.db.update(id, { state, creation_date });
  }

  async deleteCart({ id }: { id: string}) {
    return await this.db.delete({ id });
  }

}