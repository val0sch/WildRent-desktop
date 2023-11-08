import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Product from "../entities/product.entity";
import ImageService from "./image.service";

export default class ProductService {
  db: Repository<Product>;
  constructor() {
    this.db = datasource.getRepository("Product");
  }

  async listProduct() {
    return await this.db.find({ relations: ["category"] });
  }

  async productsFindByCategoryLabel(categoryLabel: string) {
    return await this.db.find({
      relations: ["category"],
      where: { category: { label: categoryLabel } },
    });
  }

  async findById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async addProduct({
    name,
    price,
    description,
    isAvailable,
    size,
    stock,
    category,
    item,
    images,
  }: any) {
    const product = await this.db.save({
      name,
      price,
      description,
      isAvailable,
      size,
      stock,
      category,
      item,
    });

    const imageService = new ImageService();
    const imagePromises = images.map(async (imageInfo: any) => {
      const { isMain, name } = imageInfo;
      return imageService.addImage({ isMain, name, product });
    });

    await Promise.all(imagePromises);

    return product;
  }

  async updateProduct({
    id,
    name,
    price,
    description,
    isAvailable,
    size,
    stock,
    category,
    item,
  }: any) {
    return await this.db.update(id, {
      name,
      price,
      description,
      isAvailable,
      size,
      stock,
      category,
      item,
    });
  }

  async deleteProduct({ id }: any) {
    return await this.db.delete({ id });
  }
}
