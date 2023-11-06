export default `#graphql
type Image {
  id: String
  isMain: Boolean
  name: String
  product: Product
}

type Query {
  images: [Image]
  imagesByProduct(productId: String!): [Image]
}

type Mutation {
  addImage(infos: ImageRegister!): Image
  deleteImage(id: String!): Image
  updateImageMainStatus(productId: String!, id: String!, isMain: Boolean!): Image
}

input ImageRegister {
  isMain: Boolean
  name: String!
  product: String!
}
`;
