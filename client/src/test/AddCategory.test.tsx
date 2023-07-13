import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddCategory from "../components/backoffice/ModaleAddCategory";
import { ADD_CATEGORY } from "../graphql/category.mutation";

test("Add category", async () => {
  const component = (
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
      {/* <AddCategory /> */}
    </MockedProvider>
  );
  render(component);

  const input = await waitFor(() => screen.findByTestId("input-category"));
  fireEvent.change(input, { target: { value: "ski" } });

  const button = await waitFor(() => screen.findByText("Enregistrer"));
  fireEvent.click(button);

  const element = await screen.findByTestId("paragraphe");
  expect(element).toBeInTheDocument();
});
