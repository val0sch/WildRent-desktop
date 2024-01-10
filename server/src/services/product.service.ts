import { Repository, In } from "typeorm";
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

  async listProductsByCart(listProductID: string[]) {
    return await this.db.findBy({
      id: In(listProductID),
  })
  } 

  async productsFindByCategoryLabel(categoryLabel: string) {
    return await this.db.find({
      relations: ["category", "images"],
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
    });

    // TODO : checker pourquoi l'image ne s'ajoute pas
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
  }: any) {
    return await this.db.update(id, {
      name,
      price,
      description,
      isAvailable,
      size,
      stock,
      category,
    });
  }

  async deleteProduct({ id }: { id: string }) {
    return await this.db.delete({ id });
  }
}
