import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/types/schema.d.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'src/types/': {
      preset: 'client',
      documents: ['src/**/*.tsx'],
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
