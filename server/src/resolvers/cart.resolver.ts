import CartService from "../services/cart.service";
import { MutationAddCartArgs, MutationDeleteCartArgs, MutationUpdateCartArgs } from "../graphql/graphql";

export default {
  Query: {
    async carts() {
      return await new CartService().listCart();
    },
  },

  Mutation: {
    async addCart(_: any, { infos }: MutationAddCartArgs) {
      const { state, creation_date, user } = infos;

      return await new CartService().addCart({
        state,
        creation_date,
        user
      });
    },

    async updateCart(_: any, { id, infos }: MutationUpdateCartArgs) {
      const { state, creation_date } = infos;

      return await new CartService().updateCart({
        id,
        state,
        creation_date
      });
    },

    async deleteCart(_: any, { id }: MutationDeleteCartArgs) {
      return await new CartService().deleteCart({ id });
    }
  },

};