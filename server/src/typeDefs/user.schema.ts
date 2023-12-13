export default `#graphql
type User {
  id: String
  email: String
  password: String
  isAdmin: Boolean
  detailsUser: DetailsUser
}

type LoginInfo {
  token: String
  email: String
  # isAdmin: Boolean
}

type Query {
  login(infos: UserLogin!): LoginInfo
  checkToken: Boolean
  checkAdmin: Boolean
}

type Mutation {
  addUser(infos: UserRegister!): User
  updateUser(id: String!, infos: UserRegister!): User
  deleteUser(id: String!): User
}

input UserLogin {
  email: String!
  password: String!
}

input UserRegister {
  email: String!
  password: String!
  isAdmin: Boolean
}
`;
