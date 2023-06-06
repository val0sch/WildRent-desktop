import { gql } from "@apollo/client";

export const UPDATE_USERDETAILS = gql`
mutation UpdateUserDetails($updateDetailsUserId: String!, $infos: DetailsUserRegister!) {
    updateDetailsUser(id: $updateDetailsUserId, infos: $infos) {
      id
      birthday
      address
      firstname
      lastname
    }
  }
`