import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Image from "../entities/image.entity";
import { ImageRegister, ImageUpdateMain } from "../graphql/graphql";
import Product from "../entities/product.entity";

export default class ImageService {
  db: Repository<Image>;
  constructor() {
    this.db = datasource.getRepository("Image");
  }

  async listImage() {
    return await this.db.find({ relations: ["product"] });
  }

  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addImage({ isMain, name, product }: ImageRegister) {
    return await this.db.save({ isMain, name, product });
  }

  async deleteImage({ id }: { id: string }) {
    return await this.db.delete({ id });
  }

  async listImagesByProductId(productId: string) {
    return await this.db.find({
      relations: ["product"],
      where: { product: { id: productId } },
    });
  }

  async updateImageMainStatus({ id, isMain }: ImageUpdateMain) {
    return await this.db.update({ id }, { isMain });
  }

  async verifyIsMainImageExistsForProduct(productId: string) {
    const existingMainImage = await this.db.findOne({
      where: { product: { id: productId }, isMain: true },
    });
    return !!existingMainImage;
  }
}
