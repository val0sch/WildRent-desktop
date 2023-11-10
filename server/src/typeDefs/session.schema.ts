export default `#graphql
    type Session {
        id: ID
        userId: String

    }
    type Query {
        checkSession: [Item]
    }
`