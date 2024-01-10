export default `#graphql
scalar Date

type Cart {
  id: ID
  state: String
  creation_date: Date
  items: [Item]
}

type Query {
  getFullCart: [FullItem]
}

type Mutation {
  addCart(infos: CartRegister!): Cart
  updateCart(id: ID!, infos: CartRegister!): Cart
  deleteCart(id: ID!): Cart
}

input CartRegister {
  state: String!
  creation_date: Date!
}

type FullItem {
  id: ID!
  start_rent_date: Date!
  due_rent_date: Date!
  isFavorite: Boolean!
  cart: Cart
  quantity: Int!
  productId: ID!
  product: ProductInfo
}

type ProductInfo {
  name: String!
  price: Int!
}

`;
