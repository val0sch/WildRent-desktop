import ItemService from "../services/item.service";
import { MutationAddItemArgs, MutationUpdateItemArgs, MutationDeleteItemArgs } from "../graphql/graphql";

export default {
  Query: {
    async items() {
      return await new ItemService().listItem();
    },
  },

  Mutation: {
    async addItem(_: any, { infos }: MutationAddItemArgs) {
      let { quantity, start_rent_date, due_rent_date, isFavorite, cart, product } = infos;

      if (isFavorite == null) { // assignation de la valeur false à isFavorite si elle n'est pas renseignée
        isFavorite = false;
      }

      return await new ItemService().addItem({
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        cart,
        product
      });
    },

    async updateItem(_: any, { id, infos }: MutationUpdateItemArgs) {
      const { quantity, start_rent_date, due_rent_date, isFavorite, cart, product } = infos;

      return await new ItemService().updateItem({
        id,
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        cart,
        product
      });
    },

    async deleteItem(_: any, { id }: MutationDeleteItemArgs) {
      return await new ItemService().deleteItem({ id });
    }
  },

};
