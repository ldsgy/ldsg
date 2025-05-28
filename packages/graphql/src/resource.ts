import { ExtendExpressApp } from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { SchemaComposer } from "graphql-compose";
import { createYoga } from "graphql-yoga";
import { DEFAULT_GRAPHQL_ENDPOINT } from "./constants";
import { GraphqlSpecificResourceSettings, ModifyGraphQLSchema } from "./types";

export class GraphqlResource extends Resource<GraphqlSpecificResourceSettings> {
  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    const {
      settings: { graphqlEndpoint = DEFAULT_GRAPHQL_ENDPOINT },
    } = this;

    const { schema } = this.getGraphQLSchema();

    const yoga = createYoga({
      graphqlEndpoint,
      schema,
    });

    app.use(yoga.graphqlEndpoint, yoga);
  };

  getGraphQLSchema = () => {
    const schemaComposer = new SchemaComposer();

    const { parentId, getFilteredResources } = this;

    const { resources } = getFilteredResources<{
      modifyGraphQLSchema?: ModifyGraphQLSchema;
    }>({
      parentId,
    });

    resources.forEach((resource) => {
      resource.modifyGraphQLSchema?.({
        schemaComposer,
      });
    });

    const schema = schemaComposer.buildSchema();

    const res = {
      schema,
    };

    return res;
  };
}
