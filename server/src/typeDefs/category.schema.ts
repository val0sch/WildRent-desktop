export default `#graphql
type Category {
  id: ID
  label: String
  imageUrl: String
}

type Query {
  getListCategories: [Category]
}

type Mutation {
  addCategory(infos: CategoryRegister!): Category
  updateCategory(id: ID!, infos: CategoryRegister!): Category
  deleteCategory(id: ID!): Category
}

input CategoryRegister {
  label: String!
  imageUrl: String!
}
`;
