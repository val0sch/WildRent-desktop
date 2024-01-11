import { PropsWithChildren, createContext, useReducer } from "react";
import { Item } from "../generated";
import { useQuery } from "@apollo/client";
import { CHECK_SESSION } from "../graphql/session.query";



interface ICartContext {
  addToCart: (item:Item) => void;
  removeFromCart: (item:Item) => void;
  cart: Item[];
  cartCount: number;
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

  // Calcule le nombre d'éléments dans le panier
  let initialCount = 0;  
  initialData.forEach((item) => {
    if (item.quantity)
    initialCount += item.quantity;
  });

  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "ADD_TO_CART":

          // Analyser l'action pour récupérer le payload et l'injecter dans le panier
          //vérifier que l'item n'est pas déjà présent dans le tableau cart? si c'est le cas, le remplacer, sinon l'ajouter
          const itemRecu = action.payload;
          const oldCart = [...prevState.cart];

          const newCount = initialCount + itemRecu.quantity;

          return {
            ...prevState,
            cart: [...prevState?.cart, action.payload],
            cartCount: newCount,
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
      cartCount: initialCount,
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
    cartCount: state?.cartCount,    
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default IntermediateProvider;
