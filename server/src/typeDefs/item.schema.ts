export default `#graphql
scalar Date

type Item {
  id: String
  quantity: Int
  start_rent_date: Date
  due_rent_date: Date
  isFavorite: Boolean
  cart: Cart
  productId: String
}

type Query {
  getListItems: [Item]
}

type Mutation {
  addItem(infos: ItemRegister!): Item
  updateItem(id: String!, infos: ItemRegister!): Item
  deleteItem(id: String!): Item
}

input ItemRegister {
  quantity: Int
  start_rent_date: Date
  due_rent_date: Date
  isFavorite: Boolean
  cart: String
  product: String
}
`;
