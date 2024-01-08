import ItemService from "../services/item.service";
import {
  MutationAddItemArgs,
  MutationUpdateItemArgs,
  MutationDeleteItemArgs,
} from "../graphql/graphql";
import { IContext } from "../index.d";

export default {
  Query: {
    async getListItems() {
      return await new ItemService().listItem();
    },
  },

  Mutation: {
    async addItem(_: any, { infos }: MutationAddItemArgs, { session }: IContext) {
      let {
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        productId,
      } = infos;

      console.log("infos" ,infos);
      console.log("session", session);

      // on vérifie si un cart est présent dans la session
      // si non : on appelle le cart service pour créer un cart et on renvoie l'id du cart créé
      // si oui : on récupère l'id du cart et on l'assigne à la variable cart

      // on ajoute l'id du cart à l'item puis on utilise le item service 

      return ;

      if (isFavorite == null) {
        // assignation de la valeur false à isFavorite si elle n'est pas renseignée
        isFavorite = false;
      }

      return await new ItemService().addItem({
        quantity,
        start_rent_date,
        due_rent_date,
        isFavorite,
        productId,
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
