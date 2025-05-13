import { ExtendExpressApp } from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { SchemaComposer } from "graphql-compose";
import { createYoga } from "graphql-yoga";
import { GraphqlSpecificResourceSettings, ModifyGraphQLSchema } from "./types";

export class GraphqlResource extends Resource<GraphqlSpecificResourceSettings> {
  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    const {
      parentId,
      settings: { graphqlEndpoint },
      getFilteredResources,
    } = this;

    const { resources } = getFilteredResources({
      parentId,
    });

    /**
     * TODO: extends graphql schema
     */

    const yoga = createYoga({
      graphqlEndpoint,
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
