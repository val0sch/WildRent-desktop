import ProductService from "../services/product.service";
import { MutationAddProductWithImagesArgs, MutationUpdateProductArgs, MutationDeleteProductArgs } from "../graphql/graphql";

export default {
  Query: {
    async products() {
      return await new ProductService().listProduct();
    },

    async productsByCategory(_: any, { categoryId }: { categoryId: string }) {
      return await new ProductService().listProductsByCategory(categoryId);
    },
  },

  Mutation: {
    async addProductWithImages(_: any, { infos }: MutationAddProductWithImagesArgs) {
      let { name, price, description, isAvailable, size, stock, category, images } = infos;

      if (isAvailable == null) {
        isAvailable = false;
      }

      return await new ProductService().addProduct({
        name,
        price,
        description,
        isAvailable,
        size,
        stock,
        category,
        images
      });
    },

    async updateProduct(_: any, { id, infos }: MutationUpdateProductArgs) {
      const { name, price, description, isAvailable, size, stock, category } = infos;

      return await new ProductService().updateProduct({
        id,
        name,
        price,
        description,
        isAvailable,
        size,
        stock,
        category
      });
    },

    async deleteProduct(_: any, { id }: MutationDeleteProductArgs) {
      return await new ProductService().deleteProduct({ id });
    }
  },

};
