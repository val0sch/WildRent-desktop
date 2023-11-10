export default `#graphql
type CartSession {
  id: String
  state: String
  creation_date: String
  items: [Item]
  session: Session
}
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
  state: String
  creation_date: String!
  user: String
}
`;
