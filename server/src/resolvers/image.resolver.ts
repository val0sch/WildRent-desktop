import ImageService from "../services/image.service";
import { MutationAddImageArgs, MutationDeleteImageArgs, MutationUpdateImageMainStatusArgs } from "../graphql/graphql";

export default {
  Query: {
    async images() {
      return await new ImageService().listImage();
    },

    async imagesByProduct(_: any, { productId }: any) {
      return await new ImageService().listImagesByProductId(productId);
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
    },

    async updateImageMainStatus(_: any, { productId, id, isMain }: MutationUpdateImageMainStatusArgs) {
      const image = await new ImageService().findById(id);

      if (!image) {
        throw new Error("Image non trouvée bb 👀");
      }

      if(isMain) {
        const existingMainImage = await new ImageService().verifyIsMainImageExistsForProduct(productId);

        if(existingMainImage) {
          throw new Error("Une image principale existe déjà pour ce produit bb sorry 👀");
        }
      }

      return await new ImageService().updateImageMainStatus( {id, isMain} );
    }
  
  },
};
