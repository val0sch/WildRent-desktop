import CategoryService from "../services/category.service";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { MutationAddCategoryArgs, MutationUpdateCategoryArgs, MutationDeleteCategoryArgs } from "../graphql/graphql";

export default {
  Query: {
    async categories() {
      return await new CategoryService().listCategory();
    },
    async category(id: string) {
      return await new CategoryService().findById(id);
    },  
  },

  Mutation: {
    async addCategory(_: any, { infos }: MutationAddCategoryArgs) {
      const { label, imageUrl } = infos;

      const category = await new CategoryService().findByLabel(label);

      if (category) {
        throw new GraphQLError("Cette catégorie existe déja", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }

      return await new CategoryService().addCategory({
        label,
        imageUrl
      });
    },

    async updateCategory(_: any, { id, infos }: MutationUpdateCategoryArgs) {
      const { label, imageUrl } = infos;
      const category = await new CategoryService().findByLabel(label);

      if (category) {
        throw new GraphQLError("Cette catégorie existe déja", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
      return await new CategoryService().updateCategory(id,{
        label,
        imageUrl
      });
    },

    async deleteCategory(_: any, { id }: MutationDeleteCategoryArgs) {
      return await new CategoryService().deleteCategory({ id });
    }
  },

};
