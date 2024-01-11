import { LIST_CATEGORIES } from "./../../../client/src/graphql/categories.query";
import { ApolloServer } from "@apollo/server";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import assert from "assert";
import CategoryService from "../services/category.service";

describe("Get Categories", () => {
  it("all categories", async () => {
    const mocks = {
      getListCategories: () => [
        {
          id: "123",
          label: "test",
          imageUrl: "test",
        },
      ],
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
    const getListCategories = new CategoryService().listCategory();
    expect(getListCategories).toHaveBeenCalled();
    // act
    // const response = await server.executeOperation({
    //   query: LIST_CATEGORIES,
    // });

    // console.log("response", JSON.stringify(response.body));
    // assert(response.body.kind === "single");
    // expect(response.body.singleResult.data?.getListCategories).toBe(
    //   mocks.getListCategories()
    // );
  });
});
