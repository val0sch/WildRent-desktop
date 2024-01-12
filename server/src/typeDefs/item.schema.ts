export default `#graphql
scalar Date

type Item {
  id: ID
  quantity: Int
  start_rent_date: Date
  due_rent_date: Date
  isFavorite: Boolean
  cart: Cart
  productId: ID
}

type Query {
  getListItems: [Item]
}

type Mutation {
  addItem(infos: ItemRegister!): Item
  resolved: String
  updateItem(id: ID!, infos: ItemRegister!): Item
  deleteItem(id: ID!): Item
}

input ItemRegister {
  quantity: Int
  start_rent_date: Date
  due_rent_date: Date
  isFavorite: Boolean
  productId: String!
}
`;
