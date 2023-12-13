export default `#graphql

scalar Date

type DetailsUser {
  id: String
  birthday: Date
  address: String
  firstname: String
  lastname: String
}

type Query {
  getDetailsUserConnected: DetailsUser
}

type Mutation {
  updateDetailsUser(id: String!, infos: DetailsUserRegister!): DetailsUser
}

input DetailsUserRegister {
  birthday: Date!
  address: String!
  firstname: String!
  lastname: String!
}
`;
