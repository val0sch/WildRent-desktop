export default `#graphql
type Image {
  id: ID
  isMain: Boolean
  name: String
  product: Product
}

type Query {
  getImagesByProduct(productId: String!): [Image]
}

type Mutation {
  addImage(infos: ImageRegister!): Image
  deleteImage(id: ID!): Image
  updateImageMainStatus(productId: String!, infos: ImageUpdateMain!): Image
}

input ImageRegister {
  isMain: Boolean!
  name: String!
  product: String!
}

input ImageUpdateMain {
  id: ID!
  isMain: Boolean!
}
`;
