import ProductService from "../services/product.service";
import {
  MutationAddProductArgs,
  MutationUpdateProductArgs,
  MutationDeleteProductArgs,
} from "../graphql/graphql";

export default {
  Query: {
    async products() {
      return await new ProductService().listProduct();
    },

    async productsByCategory(
      _: any,
      { categoryLabel }: { categoryLabel: string }
    ) {
      // console.log("categoryLabel", categoryLabel);
      return await new ProductService().productsFindByCategoryLabel(
        categoryLabel
      );
    },

    async product(_: any, { productId }: { productId: string }) {
      return await new ProductService().findById(productId);
    },
  },

  Mutation: {
    async addProduct(_: any, { infos }: MutationAddProductArgs) {
      let {
        name,
        price,
        description,
        isAvailable = false,
        size,
        stock,
        category,
      } = infos;

      if (isAvailable == null) {
        // assignation de la valeur false à isAvailable si elle n'est pas renseignée
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
      });
    },

    async updateProduct(_: any, { id, infos }: MutationUpdateProductArgs) {
      const { name, price, description, isAvailable, size, stock, category } =
        infos;

      return await new ProductService().updateProduct({
        id,
        name,
        price,
        description,
        isAvailable,
        size,
        stock,
        category,
      });
    },

    async deleteProduct(_: any, { id }: MutationDeleteProductArgs) {
      return await new ProductService().deleteProduct({ id });
    },
  },
};
