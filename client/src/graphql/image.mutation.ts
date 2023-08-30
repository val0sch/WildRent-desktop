import { gql } from "@apollo/client";

export const UPDATE_IMAGE = gql`
    mutation UpdateImage($id: String!, $isMain: Boolean!) {
        updateImage(id: $id, isMain: $isMain) {
            id
        }
    }
`;

export const DELETE_IMAGE = gql`
    mutation DeleteImage($id: String!) {
        deleteImage(id: $id) {
            id
        }
    }
`;