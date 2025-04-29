import { ExtendExpressApp } from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { createYoga } from "graphql-yoga";
import { GraphqlSpecificResourceSettings } from "./types";

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
}
