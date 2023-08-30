import { gql } from "@apollo/client";

export const DELETE_IMAGE = gql`
  mutation DeleteImage($deleteImageId: String!) {
    deleteImage(id: $deleteImageId) {
      id
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation AddImage($infos: ImageRegister!) {
    addImage(infos: $infos) {
      id
      isMain
      name
    }
  }
`;
