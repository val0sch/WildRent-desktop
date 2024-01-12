import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

/**
 * La limite ici, du fait d'utiliser le ApolloClient, est que je n'ai pas la maitrise de la
 * base de données, ça m'empeche par exemple de choisir une base de données en particulier
 * (sauf si on adapte le build de notre docker) mais surtout je ne peux pas demander à réinitialiser
 * la base de donnée avant chaque test sauf en appelant un resolver dédié pour ça (ce qui n'est pas terrible...)
 */
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://server:4000/graphql",
    fetch,
  }),
  cache: new InMemoryCache({ addTypename: false }),
});

export const LIST_CATEGORIES = gql`
  query listCategories {
    getListCategories {
      id
      label
      imageUrl
    }
  }
`;
export const ADD_CATEGORY = gql`
  mutation addCategory($infos: CategoryRegister!) {
    addCategory(infos: $infos) {
      id
      label
      imageUrl
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updateCategoryId: ID!, $infos: CategoryRegister!) {
    updateCategory(id: $updateCategoryId, infos: $infos) {
      label
      imageUrl
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($deleteCategoryId: ID!) {
    deleteCategory(id: $deleteCategoryId) {
      id
    }
  }
`;

let categoryId: string;
describe("Category Resolver", () => {

  // On test l'ajout d'une catégorie de test
  it("add a category test", async () => {
    const response = await client.mutate({
      mutation: ADD_CATEGORY,
      variables: {
        infos: {
          label: "categoryTest",
          imageUrl:
            "https://www.sparks-formation.com/wp-content/uploads/2020/06/logo-analyse-conception-uml-2.png",
        },
      },
    });
    categoryId = response.data.addCategory.id;

    expect(response.data.addCategory).toStrictEqual({
      id: categoryId,
      label: "categoryTest",
      imageUrl:
        "https://www.sparks-formation.com/wp-content/uploads/2020/06/logo-analyse-conception-uml-2.png",
    });
  });

  // On test le get de la liste des catégories
  it("get list of categories", async () => {
    const response: any = await client.query({
      query: LIST_CATEGORIES,
    });
    expect(response.data.getListCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          label: expect.any(String),
          imageUrl: expect.any(String),
        }),
      ])
    );
  });

  // On test la suppression de la catégorie
  it("delete a category", async () => {
    const response = await client.mutate({
      mutation: DELETE_CATEGORY,
      variables: {
        deleteCategoryId: categoryId,
      },
    });

    expect(response.data.deleteCategory).toStrictEqual({
      id: null,
    });
  });
});
