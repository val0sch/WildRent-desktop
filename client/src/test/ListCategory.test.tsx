import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";
import ListCategories from "../components/ListCategories";

test("List of categories", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: LIST_CATEGORIES,
          },
          result: {
            data: {
              categories: [
                {
                  id: "9fb7dfed-b442-44e7-bf27-25e4432f2a03",
                  label: "surf",
                },
              ],
            },
          },
        },
      ]}
      addTypename={false}
    >
      <ListCategories
        dataCategories={function (newData: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </MockedProvider>
  );

  const element = await screen.findByText("surf");
  expect(element).toBeInTheDocument();
});
