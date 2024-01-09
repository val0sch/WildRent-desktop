import ItemService from "../services/item.service";
import {
  MutationAddItemArgs,
  MutationUpdateItemArgs,
  MutationDeleteItemArgs,
} from "../graphql/graphql";
import { IContext } from "../index.d";
import CartService from "../services/cart.service";
import SessionService from "../services/session.service";

export default {
  Query: {
    async getListItems() {
      return await new ItemService().listItem();
    },
  },

  Mutation: {
    async addItem(_: any, { infos }: MutationAddItemArgs, { session }: IContext) {
      let cart = session?.cart;
      let {
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        productId,
      } = infos;
      
      // si oui : on récupère l'id du cart et on l'assigne à la variable cart

      // on ajoute l'id du cart à l'item puis on utilise le item service 
      if (!cart) {
        cart = await new CartService().addCart({ state: "en cours", creation_date: new Date() });
        if (session) {
          const newSession = await new SessionService().updateSession(session.id, session.userId, cart);
        }
      }

      if (isFavorite === null) {
        // assignation de la valeur false à isFavorite si elle n'est pas renseignée
        isFavorite = false;
      }

      return await new ItemService().addItem({
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        productId,
        cart,
      });
    },

    // async updateItem(_: any, { id, infos }: MutationUpdateItemArgs) {
    //   const {
    //     quantity,
    //     start_rent_date,
    //     due_rent_date,
    //     isFavorite,
    //     cart,
    //     productId,
    //   } = infos;

    //   return await new ItemService().updateItem({
    //     id,
    //     quantity,
    //     start_rent_date,
    //     due_rent_date,
    //     isFavorite,
    //     cart,
    //     productId,
    //   });
    // },

    async deleteItem(_: any, { id }: MutationDeleteItemArgs) {
      return await new ItemService().deleteItem({ id });
    },
  },
};
