import { GraphqlSpecificResourceSettings } from "@ldsg/graphql";
import { ResourceRecord } from "@ldsg/types";
import { BLOG_APPLICATION_RESOURCE_ID } from "../constants";

export const mianGraphqlResourceRecord: ResourceRecord<GraphqlSpecificResourceSettings> =
  {
    id: "mian-graphql",
    kind: "graphql",
    parentId: BLOG_APPLICATION_RESOURCE_ID,
    settings: {
      title: "GraphQL",
      description: "",
    },
  };
