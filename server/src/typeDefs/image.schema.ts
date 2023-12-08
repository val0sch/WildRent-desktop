export default `#graphql
type Image {
  id: ID
  isMain: Boolean
  name: String
  productId: String
}

type Query {
  images: [Image]
  imagesByProduct(productId: String!): [Image]
}

type Mutation {
  addImage(infos: ImageRegister!): Image
  deleteImage(id: ID!): Image
  updateImageMainStatus(productId: String!, infos: ImageUpdateMain!): Image
}

input ImageRegister {
  isMain: Boolean!
  name: String!
  productId: String!
}

input ImageUpdateMain {
  id: ID!
  isMain: Boolean!
}
`;
