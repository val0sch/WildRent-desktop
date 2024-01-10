import CartService from "../services/cart.service";
import {
  MutationAddCartArgs,
  MutationDeleteCartArgs,
  MutationUpdateCartArgs,
} from "../graphql/graphql";
import { IContext } from "../index.d";
import ItemService from "../services/item.service";
import ProductService from "../services/product.service";

export default {
  Query: {
    async getFullCart(_: any, {}, {session}: IContext) {
      const cartId = session?.cart?.id;
      if (!cartId) {
        return;
      }
      const listItems = await new ItemService().getItemsByCart(cartId);
      let listProductID = listItems.map((item) => item.productId);

      const products = await new ProductService().listProductsByCart(
        listProductID
      );

      const cartCopy = [...listItems];
      const cart = cartCopy.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        );

        return {
          ...item,
          product:{
            name: product?.name,
            price: product?.price,
          }
        };
      });

      return cart;
    },
  },
  Mutation: {
    async addCart(_: any, { infos }: MutationAddCartArgs) {
      const { state, creation_date } = infos;
      return await new CartService().addCart({
        state,
        creation_date,
      });
    },

    async updateCart(_: any, { id, infos }: MutationUpdateCartArgs) {
      const { state, creation_date } = infos;

      return await new CartService().updateCart(id, {
        state,
        creation_date,
      });
    },

    async deleteCart(_: any, { id }: MutationDeleteCartArgs) {
      return await new CartService().deleteCart({ id });
    },
  },
};
