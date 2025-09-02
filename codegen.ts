import type { CodegenConfig } from "@graphql-codegen/cli";
import { env } from "./src/utils/env.server";

const config: CodegenConfig = {
  overwrite: true,
  schema: env.WP_GRAPHQL_URI,
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/types/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
  },
};

export default config;
