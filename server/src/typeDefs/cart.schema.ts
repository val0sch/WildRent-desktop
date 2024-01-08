export default `#graphql
scalar Date

type Cart {
  id: ID
  state: String
  creation_date: Date
  items: [Item]
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
`;
