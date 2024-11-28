import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "./schema.gql",
	documents: "src/**/*.graphql",
	generates: {
		"../shared/gql.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-react-query"],
			config: {
				fetcher: "graphql-request",
				legacyMode: false,
				exposeFetcher: true,
				exposeQueryKeys: true,
			},
		},
	},
};

export default config;
