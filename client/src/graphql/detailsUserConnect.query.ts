import { gql } from "@apollo/client";

export const GET_USERDETAILS = gql`
  query GetDetailsConnectUser {
    detailsConnectUser {
      address
      birthday
      firstname
      lastname
      id
    }
  }
`;
