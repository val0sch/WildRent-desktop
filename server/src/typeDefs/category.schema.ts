export default `#graphql
type Category {
  id: String
  label: String
  imageUrl: String
}

type Query {
  getListCategories: [Category]
}

type Mutation {
  addCategory(infos: CategoryRegister!): Category
  updateCategory(id: String!, infos: CategoryRegister!): Category
  deleteCategory(id: String!): Category
}

input CategoryRegister {
  label: String!
  imageUrl: String!
}
`;
