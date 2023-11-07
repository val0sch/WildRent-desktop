import { createContext, useReducer } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  async setUserData(data: any) {},
  logout() {},
  userInfos: {
    email: "",
  },
});

export default function AuthContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "LOG_IN":
          return {
            ...prevState,
            userData: action.userData,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            userData: {},
          };
      }
    },
    {
      userData: JSON.parse(`${localStorage.getItem("userData")}`) || {},
    }
  );

  const  navigate:NavigateFunction = useNavigate();

  const authContext = {
    setUserData: async (data: any) => {
      const { token, ...userData } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch({ type: "LOG_IN", userData });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      dispatch({ type: "LOG_OUT" });
      navigate("/");
    },
    userInfos: {
      ...state.userData,
    },
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
