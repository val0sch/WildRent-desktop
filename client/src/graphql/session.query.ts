import { gql } from "@apollo/client";

export const CHECK_SESSION = gql`
  query CheckSession {
  checkSession {
    start_rent_date
    quantity
    productId
    isFavorite
    id
    due_rent_date
    
  }
}
`;