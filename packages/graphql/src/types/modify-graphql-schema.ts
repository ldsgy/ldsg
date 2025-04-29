import { SchemaComposer } from "graphql-compose";

interface ModifyGraphQLSchemaParams {
  schemaComposer: SchemaComposer;
}

export type ModifyGraphQLSchema = (params: ModifyGraphQLSchemaParams) => void;
