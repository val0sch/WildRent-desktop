import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  generates: {
    "src/graphql/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  watch: true,
};

export default config;
