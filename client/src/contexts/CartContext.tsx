import { PropsWithChildren, createContext, useReducer } from "react";
import { Item } from "../generated";
import { useQuery } from "@apollo/client";
import { CHECK_SESSION } from "../graphql/session.query";

interface ICartContext {
  addToCart: (item:Item) => void;
  removeFromCart: (item:Item) => void;
  cart: Item[];
}
export const CartContext = createContext({} as ICartContext);

function IntermediateProvider({ children }: PropsWithChildren) {
  const { data } = useQuery(CHECK_SESSION, {
    fetchPolicy: "no-cache",
  });
  return data ? (
    <CartContextProvider initialData={data.checkSession}>
      {children}
    </CartContextProvider>
  ) : null;
}
function CartContextProvider({
  children,
  initialData,
}: PropsWithChildren & { initialData: Item[] }) {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "ADD_TO_CART":
          // Analyser l'action pour récupérer le payload et l'injecter dans le panier
          return {
            ...prevState,
            cart: [...prevState?.cart, action.payload],
          };
        case "REMOVE_FROM_CART":
          // Analyser l'action pour récupérer le payload et supprimer l'élément du panier
          return {
            ...prevState,
            cart: prevState.cart.filter((item: { id: any; }) => item.id !== action.payload.id),
          };
        default:
          return prevState;
      }
    },
    {
      cart: initialData,
    }
  );
  const cartContext = {
    addToCart: (item: Item) => {
      dispatch({ type: "ADD_TO_CART", payload: item });
    },
    removeFromCart: (item: Item) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: item });
    },
    cart: state?.cart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default IntermediateProvider;
