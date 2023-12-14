export default `#graphql
    type Session {
        id: ID
        userId: ID
        cartId: ID
    }
    type Query {
        checkSession: [Item]
    }
`;
