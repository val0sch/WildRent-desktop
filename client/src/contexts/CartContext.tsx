import { PropsWithChildren, createContext, useReducer } from "react";
import { Item } from "../generated";
import { useQuery } from "@apollo/client";
import { CHECK_SESSION } from "../graphql/session.query";

interface ICartContext {
  addToCart: () => void;
  removeFromCart: () => void;
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
  // useEffect(() => {
  //   checkSession({
  //     onCompleted(data) {
  //       console.log(data);
  //     },
  //   });
  // }, [checkSession]);
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
      cart: initialData,
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

export default IntermediateProvider;
