import { gql } from "@apollo/client";

export const ADD_ITEM = gql`
  mutation addItem($infos: ItemRegister!) {
    addItem(infos: $infos) {
      id
    }
  }
`;
