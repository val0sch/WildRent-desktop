import { PropsWithChildren, createContext, useEffect, useReducer } from "react";
import { Item } from "../generated";
import { useLazyQuery } from "@apollo/client";
import { CHECK_SESSION } from "../graphql/session.query";

interface ICartContext {
  addToCart: () => void;
  removeFromCart: () => void;
  cart: Item[];
}
export const CartContext = createContext({} as ICartContext);

function CartContextProvider({ children }: PropsWithChildren) {
  const [checkSession] = useLazyQuery(CHECK_SESSION);

  useEffect(() => {
    checkSession({
      onCompleted(data) {
        console.log(data);
      },
    });
  }, [checkSession]);
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "ADD_TO_CART":
          //anylser l'action pour récupérer le payload et l'injecter dans le cart
          return {
            ...prevState,
            cart: [...prevState?.cart, action.payload],
          };
      }
    },
    {
      cart: [], //viendra du localStorage
    },
    () => {
      return;
    }
  );
  const cartContext = {
    addToCart() {},
    removeFromCart() {},
    cart: state?.cart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
