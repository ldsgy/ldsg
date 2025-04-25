import { ExtendExpressApp } from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { createYoga } from "graphql-yoga";
import { GraphqlSpecificResourceSettings } from "./types";

export class GraphqlResource extends Resource<GraphqlSpecificResourceSettings> {
  extendExpressApp: ExtendExpressApp = async (params) => {
    const { app } = params;

    const { graphqlEndpoint } = this.settings;

    const yoga = createYoga({
      graphqlEndpoint,
    });

    app.use(yoga.graphqlEndpoint, yoga);

    // const handler = getHandler();

    // app.get(path, handler);
  };
}
