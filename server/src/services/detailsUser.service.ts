import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import DetailsUser from "../entities/detailsUser.entity";

export default class DetailsUserService {
  db: Repository<DetailsUser>;
  constructor() {
    this.db = datasource.getRepository("DetailsUser");
  }

  async listDetailsUsers() {
    return await this.db.find();
  }

  async addDetailsUser({ birthday, address, firstname, lastname }: any) {
    return await this.db.save({ birthday, address, firstname, lastname });
  }

 async updateDetailsUser({ id, birthday, address, firstname, lastname }: any) {
    return await this.db.update({ id }, { birthday, address, firstname, lastname });
  }

  async deleteDetailsUser({ id }: any) {
    return await this.db.delete({ id });
  }

}
