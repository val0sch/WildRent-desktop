import UserService from "../services/user.service";
import DetailsUserService from "../services/detailsUser.service";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { hash, verify } from "argon2";
import * as jwt from "jsonwebtoken";
import { IContext } from "../index.d";
import {
  MutationAddUserArgs,
  MutationUpdateUserArgs,
  MutationDeleteUserArgs,
  QueryLoginArgs,
} from "../graphql/graphql";

export default {
  Query: {    

    async checkSession(_: any, {}, { user }: IContext) {
      return  null;
    }    
  }  
};
