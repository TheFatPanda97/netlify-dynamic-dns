/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrUpdateARecord: Record;
  deleteRecord: Record;
};


export type MutationAddOrUpdateARecordArgs = {
  dns_zone: Scalars['String']['input'];
  host_name: Scalars['String']['input'];
  record_id?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRecordArgs = {
  dns_zone: Scalars['String']['input'];
  record_id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getARecords: Array<Record>;
};


export type QueryGetARecordsArgs = {
  dns_zone: Scalars['String']['input'];
};

export type Record = {
  __typename?: 'Record';
  dns_zone_id: Scalars['String']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
  flag?: Maybe<Scalars['String']['output']>;
  hostname: Scalars['String']['output'];
  id: Scalars['String']['output'];
  managed: Scalars['Boolean']['output'];
  port?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  site_id?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  ttl?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
  weight?: Maybe<Scalars['String']['output']>;
};

export type DeleteRecordMutationVariables = Exact<{
  dns_zone: Scalars['String']['input'];
  record_id: Scalars['String']['input'];
}>;


export type DeleteRecordMutation = { __typename?: 'Mutation', deleteRecord: { __typename?: 'Record', hostname: string } };

export type GetAllARecordsQueryVariables = Exact<{
  dns_zone: Scalars['String']['input'];
}>;


export type GetAllARecordsQuery = { __typename?: 'Query', getARecords: Array<{ __typename?: 'Record', id: string, hostname: string, value: string }> };


export const DeleteRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dns_zone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"record_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dns_zone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dns_zone"}}},{"kind":"Argument","name":{"kind":"Name","value":"record_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"record_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hostname"}}]}}]}}]} as unknown as DocumentNode<DeleteRecordMutation, DeleteRecordMutationVariables>;
export const GetAllARecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllARecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dns_zone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getARecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dns_zone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dns_zone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hostname"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetAllARecordsQuery, GetAllARecordsQueryVariables>;