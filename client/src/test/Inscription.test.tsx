import { render, screen } from "@testing-library/react";
import AddUserMutation from "../components/AddUserMutation";
import { MemoryRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
// import userEvent from "@testing-library/user-event";

describe("inscription", () => {
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
  let sendHandler: any;

  it("Appel du handle Add", () => {
    function sendRegister() {
      sendHandler = jest.fn().mockName("addUserInDb");
      console.log(sendHandler);
      render(
        <MemoryRouter>
          <ApolloProvider client={client}>
            <AddUserMutation />
          </ApolloProvider>
        </MemoryRouter>
      );
    }
    sendRegister();
    // expect(sendHandler).toHaveBeenCalledWith({
    //   variables: {
    //     infos: {
    //       email: "email@email.com",
    //       password: "password123",
    //     },
    //   },
    // });
    expect(sendHandler).toHaveBeenCalled();
  });
});
