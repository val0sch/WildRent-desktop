export default `#graphql
type User {
  id: ID
  email: String
  password: String
  isAdmin: Boolean
  detailsUser: DetailsUser
}

type UserEmail{
  email: String
}

type LoginInfo {
  token: String
  email: String
}

type Query {
  login(infos: UserLogin!): LoginInfo
  checkToken: Boolean
  checkAdmin: Boolean
  getListUsers: [UserEmail]
}

type Mutation {
  addUser(infos: UserRegister!): User
  updateUser(id: ID!, infos: UserRegister!): User
  deleteUser(id: ID!): User
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
