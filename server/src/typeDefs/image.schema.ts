export default `#graphql
type Image {
  id: ID
  isMain: Boolean
  name: String
  product: Product
} 

type Query {
  getImagesByProduct(productId: ID!): [Image]
}

type Mutation {
  addImage(infos: ImageRegister!): Image
  deleteImage(id: ID!): Image
  updateImageMainStatus(productId: ID!, infos: ImageUpdateMain!): Image
}

input ImageRegister {
  isMain: Boolean!
  name: String!
  product: ProductImageInput!
}

input ProductImageInput{
  id: ID!
}

input ImageUpdateMain {
  id: ID!
  isMain: Boolean!
}
`;
