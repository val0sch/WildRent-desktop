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
      productId
    }
  }
`;

export const UPDATE_IMAGE_MAIN_STATUS = gql`
  mutation UpdateImageMainStatus(
    $productId: String!
    $updateImageMainStatusId: String!
    $isMain: Boolean!
  ) {
    updateImageMainStatus(
      productId: $productId
      infos: { id: $updateImageMainStatusId, isMain: $isMain }
    ) {
      id
      isMain
      name
    }
  }
`;
