export default `#graphql

scalar Date

type DetailsUser {
  id: ID
  birthday: Date
  address: String
  firstname: String
  lastname: String
}

type Query {
  getDetailsUserConnected: DetailsUser
}

type Mutation {
  updateDetailsUser(id: ID!, infos: DetailsUserRegister!): DetailsUser
}

input DetailsUserRegister {
  birthday: Date!
  address: String!
  firstname: String!
  lastname: String!
}
`;
