import { gql } from "@apollo/client";

export const USER_DETAILS = gql`
  query UserDetails() {
    getDetailsUserConnected() {
      detailsUser {
        id
        name
        firstname
        lastname
        birthday
        address
      }
    }
  }
`;
