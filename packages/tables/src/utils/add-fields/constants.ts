import { resolverFactory } from "graphql-compose-mongoose";

export type ResolverFactoryKeyList = (keyof typeof resolverFactory)[];

export const MUTATION_RESOLVER_FACTORY_KEY_LIST: ResolverFactoryKeyList = [
  "createOne",
  "createMany",
  "updateById",
  "updateOne",
  "updateMany",
  "removeById",
  "removeOne",
  "removeMany",
];

export const QUERY_RESOLVER_FACTORY_KEY_LIST: ResolverFactoryKeyList = [
  "findById",
  "findByIds",
  "findOne",
  "findMany",
  "dataLoader",
  "dataLoaderMany",
  "count",
  "connection",
  "pagination",
];
