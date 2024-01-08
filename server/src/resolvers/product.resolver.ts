import ProductService from "../services/product.service";
import ImageService from "../services/image.service";
import {
  MutationAddProductWithImagesArgs,
  MutationUpdateProductArgs,
  MutationDeleteProductArgs,
} from "../graphql/graphql";

export default {
  Query: {
    async getListProducts() {
      return await new ProductService().listProduct();
    },

    async getListProductsByCategory(
      _: any,
      { categoryLabel }: { categoryLabel: string }
    ) {
      return await new ProductService()
        .productsFindByCategoryLabel(categoryLabel)
        .then((products) => {
          return products.map(async (product) => {
            const images = await new ImageService().listImagesByProductId(
              product.id
            );
            product.images = images;
            return product;
          });
        });
    },

    async getProductById(_: any, { productId }: { productId: string }) {
      return await new ProductService().findById(productId);
    },
  },

  Mutation: {
    async addProductWithImages(
      _: any,
      { infos }: MutationAddProductWithImagesArgs
    ) {
      let {
        name,
        price,
        description,
        isAvailable,
        size,
        stock,
        category,
        images,
      } = infos;

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
        images,
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
