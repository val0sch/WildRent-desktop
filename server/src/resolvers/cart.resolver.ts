import CartService from "../services/cart.service";
import {
  Cart,
  MutationAddCartArgs,
  MutationDeleteCartArgs,
  MutationUpdateCartArgs,
} from "../graphql/graphql";
import { Query } from "type-graphql";
import { IContext } from "../index.d";
import ItemService from "../services/item.service";
import ProductService from "../services/product.service";

export default {
  Query: {
    // async getProductsByCart(_: any, {}: any, {session}: IContext) {
    //   const cart = session?.cart;
    //   if (!cart) {
    //     return;
    //   }
    //   await new ItemService().getItemsByCart(cart);

    //   return;
    // }
    async getFullCart(_: any, { cartId }: { cartId: string }) {
      console.log("test");
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
          product,
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
