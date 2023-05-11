import UserService from "../services/user.service";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";

export default {
  Query: {
    async users() {
      return await new UserService().listUsers();
    },
  },
};
