import { IContext } from "../index.d";

import Item from "../entities/item.entity";

export default {
  Query: {
    async checkSession(_: any, {}, { user, session }: IContext) {
      let data: Item[] = [];
      const cart = session?.cart;
      if (cart) {
        data = cart.items;
      }
      return data;
    },
  },
};
