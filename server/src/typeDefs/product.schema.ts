export default `#graphql
type Product {
  id: String
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
  getProductById(productId: String!): Product
}

type Mutation {
  addProductWithImages(infos: ProductRegister!): Product
  updateProduct(id: String!, infos: ProductRegister!): Product
  deleteProduct(id: String!): Product
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
