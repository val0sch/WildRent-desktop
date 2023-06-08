import { render, screen, act, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddCategory from "../components/AddCategory";
import { ADD_CATEGORY } from "../graphql/category.mutation";
import userEvent from "@testing-library/user-event";

test("Add category", async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ADD_CATEGORY,
              variables: {
                infos: {
                  label: "ski",
                },
              },
            },
            result: {
              data: {
                addCategory: {
                  id: "2f49f146-4a0c-414c-9900-f6703a5094dc",
                  label: "ski",
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <AddCategory />
      </MockedProvider>
    );
    const button = await screen.findByText("Enregistrer");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    userEvent.click(button);
  });

  expect(await screen.findByText("ski")).toBeInTheDocument();
});
