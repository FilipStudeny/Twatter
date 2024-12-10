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
				reactQueryVersion: 5,
			},
		},
	},
};

export default config;
