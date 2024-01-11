import { ApolloServer } from "@apollo/server";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ADD_ITEM } from "./../../../client/src/graphql/item.mutation";
import assert from "assert";
import Item from "../entities/item.entity";

describe("AddItem", () => {
  it("returns id item and quantity", async () => {
    const mocks = {
      AddItem: () => ({
        infos: {
          start_rent_date: new Date(),
          due_rent_date: new Date(),
          isFavorite: false,
          quantity: 4,
          productId: "123",
        },
      }),
      ReturnAddItem: () => ({
        id: "123",
        quantity: 4,
      }),
    };

    const server = new ApolloServer({
      // addMocksToSchema accepts a schema instance and provides
      // mocked data for each field in the schema
      schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks,
        preserveResolvers: true,
      }),
    });

    // act
    const response = await server.executeOperation(
      {
        query: ADD_ITEM,
        variables: mocks.AddItem(),
      },
      {
        contextValue: {
          session: {
            userId: "123",
          },
        },
      }
    );
    console.log("response", JSON.stringify(response.body));
    assert(response.body.kind === "single");

    expect(response.body.singleResult.data?.addItem).toEqual(
      mocks.ReturnAddItem()
    );
  });
});
