export default `#graphql
    type Session {
        id: ID
        userId: String
        cartId: String
    }
    type Query {
        checkSession: [Item]
    }
`