import { useQuery } from "@apollo/client";
import useCart from "../hooks/useCart";

function Panier(): JSX.Element {
  const {cart} = useCart()
  
  console.log(cart)
  // const data = useQuery()
  return (
    <div>
      Mon panier 
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <h2>{item.productId}</h2>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Panier;