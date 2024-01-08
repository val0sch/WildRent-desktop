import { gql } from "@apollo/client";

export const USER_DETAILS = gql`
  query detailsUser {
    getDetailsUserConnected {
      id
      firstname
      lastname
      birthday
      address
    }
  }
`;
