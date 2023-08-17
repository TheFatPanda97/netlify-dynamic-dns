import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  addARecord: Record;
  deleteRecord: Record;
  updateARecord: Record;
};


export type MutationAddARecordArgs = {
  dns_zone: Scalars['String']['input'];
  host_name: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRecordArgs = {
  dns_zone: Scalars['String']['input'];
  record_id: Scalars['String']['input'];
};


export type MutationUpdateARecordArgs = {
  dns_zone: Scalars['String']['input'];
  host_name: Scalars['String']['input'];
  record_id: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type NetlifyRecord = {
  __typename?: 'NetlifyRecord';
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
  is_public_ip: Scalars['Boolean']['output'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NetlifyRecord: ResolverTypeWrapper<NetlifyRecord>;
  Query: ResolverTypeWrapper<{}>;
  Record: ResolverTypeWrapper<Record>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  NetlifyRecord: NetlifyRecord;
  Query: {};
  Record: Record;
  String: Scalars['String']['output'];
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addARecord?: Resolver<ResolversTypes['Record'], ParentType, ContextType, RequireFields<MutationAddARecordArgs, 'dns_zone' | 'host_name'>>;
  deleteRecord?: Resolver<ResolversTypes['Record'], ParentType, ContextType, RequireFields<MutationDeleteRecordArgs, 'dns_zone' | 'record_id'>>;
  updateARecord?: Resolver<ResolversTypes['Record'], ParentType, ContextType, RequireFields<MutationUpdateARecordArgs, 'dns_zone' | 'host_name' | 'record_id'>>;
};

export type NetlifyRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['NetlifyRecord'] = ResolversParentTypes['NetlifyRecord']> = {
  dns_zone_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  flag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  managed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ttl?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getARecords?: Resolver<Array<ResolversTypes['Record']>, ParentType, ContextType, RequireFields<QueryGetARecordsArgs, 'dns_zone'>>;
};

export type RecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Record'] = ResolversParentTypes['Record']> = {
  dns_zone_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  flag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hostname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  is_public_ip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  managed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ttl?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  NetlifyRecord?: NetlifyRecordResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Record?: RecordResolvers<ContextType>;
};

