import DetailsUserService from "../services/detailsUser.service";
import { MutationUpdateDetailsUserArgs } from "../graphql/graphql";


export default {
  Query: {
    async detailsUsers() {
      return await new DetailsUserService().listDetailsUsers();
    },
    detailsConnectUser(_: any, {}, { user }: any){
      return user?.detailsUser;
    }
  },
  Mutation: {
    async updateDetailsUser(_: any, { id, infos }: MutationUpdateDetailsUserArgs, { user }: any) {
      const {  birthday, address, firstname, lastname } = infos;
      console.log(user);
      // return await new DetailsUserService().updateDetailsUser({
      //   id,
      //   birthday,
      //   address,
      //   firstname,
      //   lastname
      // });
    },
  },
};
