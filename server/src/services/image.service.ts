import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Image from "../entities/image.entity";

export default class ImageService {
  db: Repository<Image>;
  constructor() {
    this.db = datasource.getRepository("Image");
  }

  async listImage() {
    return await this.db.find({ relations: ['product'] });
  }
  
  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addImage({ isMain, name, product }: any) {
    return await this.db.save({ isMain, name, product });
  }
  
  async deleteImage({ id }: any) {
    return await this.db.delete({ id });
  }

}