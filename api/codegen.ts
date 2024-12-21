import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "./schema.gql",
	documents: "src/**/*.graphql",
	generates: {
		"../shared/gql.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-react-query"],
			config: {
				addDocBlocks: false,
				dedupeFragments: true,
				pureMagicComment: true,
				disableDescriptions: true,
				fetcher: "graphql-request",
				legacyMode: false,
				exposeFetcher: true,
				exposeDocument: true,
				exposeQueryKeys: true,
				exposeMutationKeys: true,
				reactQueryVersion: 5,
				addInfiniteQuery: true,
				errorType: "any",
			},
		},
	},
};

export default config;
