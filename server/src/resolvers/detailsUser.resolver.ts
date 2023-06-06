import DetailsUserService from "../services/detailsUser.service";
import { MutationUpdateDetailsUserArgs } from "../graphql/graphql";


export default {
  Query: {
    async detailsUsers() {
      return await new DetailsUserService().listDetailsUsers();
    },
  },
  Mutation: {
    async updateDetailsUser(_: any, { id, infos }: MutationUpdateDetailsUserArgs) {
      const {  birthday, address, firstname, lastname } = infos;

      return await new DetailsUserService().updateDetailsUser({
        id,
        birthday,
        address,
        firstname,
        lastname
      });
    },
  },
};
