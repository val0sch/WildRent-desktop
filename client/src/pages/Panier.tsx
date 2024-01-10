import { useQuery } from "@apollo/client";
import {  useState } from "react";
import { GET_FULL_CART } from "../graphql/cart.query";

function Panier(): JSX.Element {

  const [ fullCart, setFullCart ] = useState([]);

  useQuery(GET_FULL_CART, {
    onCompleted(data) {
      setFullCart(data.getFullCart);
    },
    onError(error) {
      console.error("error",error);
    },
  });
  
  return (
    <div>
      Mon panier 
      <div>
        {fullCart.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div>{item.product.price}</div>
              <div>{item.product.name}</div>
            </div>
          )
        }
        )}
      </div>
    </div>
  );
}

export default Panier;