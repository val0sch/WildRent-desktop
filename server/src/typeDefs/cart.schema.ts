export default `#graphql
type Cart {
  id: ID
  state: String
  creation_date: String
  items: [Item]
}

type Mutation {
  addCart(infos: CartRegister!): Cart
  updateCart(id: String!, infos: CartRegister!): Cart
  deleteCart(id: String!): Cart
}

input CartRegister {
  state: String
  creation_date: String!
}
`;
