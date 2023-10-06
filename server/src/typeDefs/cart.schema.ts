export default `#graphql
type Cart {
  id: String
  state: String
  creation_date: String
  user: User
}

type Query {
  carts: [Cart]
}

type Mutation {
  addCart(infos: CartRegister!): Cart
  updateCart(id: String!, infos: CartRegister!): Cart
  deleteCart(id: String!): Cart
}

input CartRegister {
  state: String!
  creation_date: String!
  user: String!
}
`;
