import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
});


const authLink = setContext((_, { headers }) => {
  //on va modifier les headers envoyés pour chaque requête

  //on récupère le token dans le localStorage préalablement stocké lors d'un login
  const token = localStorage.getItem("token");

  //pour finir on retourne les headers modifiés
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // on y injecte le token
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  link: authLink.concat(httpLink),
});

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
