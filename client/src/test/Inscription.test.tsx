import { render, screen } from "@testing-library/react";
import AddUserMutation from "../components/AddUserMutation";
import { MemoryRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

test("inscription", () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  render(
    <MemoryRouter>
      <ApolloProvider client={client}>
        <AddUserMutation />
      </ApolloProvider>
    </MemoryRouter>
  );

expect(screen.getByRole('button', { name: "S'inscrire" })).toHaveAttribute('href', '/compte/infos')
});
