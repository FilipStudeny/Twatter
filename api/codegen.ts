import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "./schema.gql",
	documents: "src/**/*.graphql",
	generates: {
		"../shared/code/gql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-query",
				{
					add: {
						content: `import { GraphQLResponse } from "graphql-request/dist/types";`,
					},
				},
			],

			config: {
				addDocBlocks: false,
				dedupeFragments: true,
				pureMagicComment: true,
				disableDescriptions: true,
				fetcher: {
					func: "./fetcher.client.ts#fetcher", // Use the custom fetcher without a client parameter
				},
				legacyMode: false,
				exposeFetcher: true,
				exposeDocument: true,
				exposeQueryKeys: true,
				exposeMutationKeys: true,
				reactQueryVersion: 5,
				addInfiniteQuery: true,
				errorType: "GraphQLResponse",
			},
		},
	},
};

export default config;
