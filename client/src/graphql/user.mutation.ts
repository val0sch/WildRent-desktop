import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation AddUser($infos: UserRegister!) {
    addUser(infos: $infos) {
      id
      email
      password
      isAdmin
    }
  }
`