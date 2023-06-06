import ImageService from "../services/image.service";
import { MutationAddImageArgs, MutationDeleteImageArgs } from "../graphql/graphql";

export default {
  Query: {
    async images() {
      return await new ImageService().listImage();
    },
  },

  Mutation: {
    async addImage(_: any, { infos }: MutationAddImageArgs) {
      let { isMain, name, product } = infos;

      if (isMain == null) { // assignation de la valeur false à isMain si elle n'est pas renseignée
        isMain = false;
      }
      return await new ImageService().addImage({
        isMain,
        name,
        product
      });
    },

    async deleteImage(_: any, { id }: MutationDeleteImageArgs) {
      return await new ImageService().deleteImage({ id });
    }
  },

};