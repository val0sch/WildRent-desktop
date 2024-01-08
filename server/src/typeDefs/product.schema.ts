export default `#graphql
type Product {
  id: ID
  name: String
  price: Int
  description: String
  isAvailable: Boolean
  size: String
  stock: Int
  category: Category
  images: [Image]
}

type Query {
  getListProducts: [Product]
  getListProductsByCategory(categoryLabel: String!): [Product]
  getProductById(productId: ID!): Product
}

type Mutation {
  addProductWithImages(infos: ProductRegister!): Product
  updateProduct(id: ID!, infos: ProductRegister!): Product
  deleteProduct(id: ID!): Product
}

input ProductRegister {
  name: String!
  price: Int!
  description: String!
  isAvailable: Boolean
  size: String!
  stock: Int!
  category: String
  images: [ImageInput]
}

input ImageInput {
  isMain: Boolean
  name: String
}
`;
