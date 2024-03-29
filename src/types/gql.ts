/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation DeleteRecord($dns_zone: String!, $record_id: String!) {\n      deleteRecord(dns_zone: $dns_zone, record_id: $record_id) {\n          hostname\n      }\n    }\n  ": types.DeleteRecordDocument,
    "\n    query GetAllARecords($dns_zone: String!) {\n      getARecords(dns_zone: $dns_zone) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  ": types.GetAllARecordsDocument,
    "\n    mutation AddRecord($dns_zone: String!, $host_name: String!, $value: String) {\n      addARecord(dns_zone: $dns_zone, host_name: $host_name, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  ": types.AddRecordDocument,
    "\n    mutation UpdateRecord($dns_zone: String!, $host_name: String!, $record_id: String!, $value: String) {\n      updateARecord(dns_zone: $dns_zone, host_name: $host_name, record_id: $record_id, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  ": types.UpdateRecordDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteRecord($dns_zone: String!, $record_id: String!) {\n      deleteRecord(dns_zone: $dns_zone, record_id: $record_id) {\n          hostname\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteRecord($dns_zone: String!, $record_id: String!) {\n      deleteRecord(dns_zone: $dns_zone, record_id: $record_id) {\n          hostname\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllARecords($dns_zone: String!) {\n      getARecords(dns_zone: $dns_zone) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "): (typeof documents)["\n    query GetAllARecords($dns_zone: String!) {\n      getARecords(dns_zone: $dns_zone) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddRecord($dns_zone: String!, $host_name: String!, $value: String) {\n      addARecord(dns_zone: $dns_zone, host_name: $host_name, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "): (typeof documents)["\n    mutation AddRecord($dns_zone: String!, $host_name: String!, $value: String) {\n      addARecord(dns_zone: $dns_zone, host_name: $host_name, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateRecord($dns_zone: String!, $host_name: String!, $record_id: String!, $value: String) {\n      updateARecord(dns_zone: $dns_zone, host_name: $host_name, record_id: $record_id, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateRecord($dns_zone: String!, $host_name: String!, $record_id: String!, $value: String) {\n      updateARecord(dns_zone: $dns_zone, host_name: $host_name, record_id: $record_id, value: $value) {\n        id\n        hostname\n        value\n        is_public_ip\n        created_at\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;