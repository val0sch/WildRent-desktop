import DetailsUserService from "../services/detailsUser.service";
import { MutationUpdateDetailsUserArgs, User } from "../graphql/graphql";
import { IContext } from "../index.d";

export default {
  Query: {
    getDetailsUserConnected(_: any, {}, { user }: IContext) {
      return user?.detailsUser;
    },
  },
  Mutation: {
    async updateDetailsUser(
      _: any,
      { id, infos }: MutationUpdateDetailsUserArgs
    ) {
      const { birthday, address, firstname, lastname } = infos;
      return await new DetailsUserService().updateDetailsUser(id, {
        birthday,
        address,
        firstname,
        lastname,
      });
    },
  },
};
