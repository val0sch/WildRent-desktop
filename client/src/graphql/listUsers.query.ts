import { gql } from "@apollo/client";

export const LIST_USERS = gql`
query Users {
  users {
    email
    isAdmin
    detailsUser {
      firstname
      lastname
      address
      birthday
    }
  }
}
`