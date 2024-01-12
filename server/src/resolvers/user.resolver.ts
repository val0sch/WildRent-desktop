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
    async login(_: any, { infos }: QueryLoginArgs) {
      const { email, password } = infos;
      //vérification que le user existe bien :
      const user = await new UserService().findByEmail(email);
      if (!user) {
        throw new GraphQLError("Ce compte n'existe pas!", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
      //isPasswordCorrect sera un boolean, si true ça veut dire que le hashage du mot de passe stocké est le même que le mot de passe reçu, donc qu'ils sont pareils
      const isPasswordCorrect = await verify(user.password, password);
      if (!isPasswordCorrect) {
        throw new GraphQLError("Vérifiez vos informations!", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      //on récupère la valeur de isAdmin du user pour le stocker dans le payload
      const isAdmin = user.isAdmin;

      //génération du token permettant ensuite de s'authentifié auprès de chaque resolvers sans indiquer un identifiant et un mot de passe
      const token = jwt.sign({ email }, `${process.env.SECRET_KEY}`); // on stocke ici un payload qui est un objet contenant email, signé grâce à la clé secrète
      return { token, email };
    },

    async checkToken(_: any, {}, { user }: IContext) {
      return user !== null;
    },
    async checkAdmin(_: any, {}, { user }: IContext) {
      let isAdmin = false;
      if (user) {
        isAdmin = user.isAdmin;
      }
      return isAdmin;
    },

    async getListUsers(_: any, {}) {
      return await new UserService().listUsers();
    },
  },

  Mutation: {
    async addUser(_: any, { infos }: MutationAddUserArgs) {
      let { email, password: plainPassword, isAdmin = false } = infos;

      if (isAdmin == null) {
        // assignation de la valeur false à isAdmin si elle n'est pas renseignée
        isAdmin = false;
      }

      // Vérification que l'email n'est pas déjà pris
      const userCheck = await new UserService().findByEmail(email);
      if (userCheck) {
        throw new GraphQLError("Cet email est déjà pris", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      // Hashage du mot de passe
      const password = await hash(plainPassword);

      // Création du DetailsUser
      const detailsUser = new DetailsUserService().addDetailsUser({
        firstname: "",
        lastname: "",
        birthday: "",
        address: "",
      });
      const detailsUserId = (await detailsUser).id;

      // Création du User
      let user = new UserService().addUser({
        email,
        password,
        isAdmin,
        detailsUser: detailsUserId,
      });

      return user;
    },

    async updateUser(_: any, { id, infos }: MutationUpdateUserArgs) {
      const { email, password: plainPassword, isAdmin } = infos;

      const user = await new UserService().findById(id);

      //TODO: vérifier que l'email n'est pas déjà pris par un autre user

      const password = await hash(plainPassword);

      return await new UserService().updateUser({
        id,
        email,
        password,
        isAdmin,
      });
    },

    async deleteUser(_: any, { id }: MutationDeleteUserArgs) {
      const user = await new UserService().findById(id);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      const detailsUserId = user.detailsUser.id;
      await Promise.all([
        new UserService().deleteUser({ id }),
        new DetailsUserService().deleteDetailsUser({ id: detailsUserId }),
      ]);
      return "Utilisateur supprimé";
    },
  },
};
