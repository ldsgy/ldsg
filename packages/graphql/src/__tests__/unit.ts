import { Resource } from "@ldsg/resource";
import { printSchema } from "graphql";
import { GraphqlResource } from "../resource";
import { ModifyGraphQLSchema } from "../types";

test("unit", () => {
  const graphqlResource = new GraphqlResource({
    id: "test-graphql",
    kind: "GRAPHQL",
    parentId: "test-application",
    settings: {
      title: "",
      description: "",
      graphqlEndpoint: "/test-graphql",
    },
  });

  class AResource extends Resource {
    modifyGraphQLSchema: ModifyGraphQLSchema = (params) => {
      const { schemaComposer } = params;

      const PostTC = schemaComposer.createObjectTC({
        name: "Post",
        fields: {
          id: "Int!",
          title: "String",
          votes: "Int",
          authorId: "Int",
        },
      });

      schemaComposer.Query.addFields({
        posts: {
          type: "[Post]",
          resolve: () => [
            { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
            { id: 2, authorId: 2, title: "Welcome to Apollo", votes: 3 },
            { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
            { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
          ],
        },
      });
    };
  }

  new AResource({
    id: "test-a",
    kind: "A",
    parentId: "test-application",
    settings: {
      title: "",
      description: "",
    },
  });

  const { schema } = graphqlResource.getGraphQLSchema();

  expect(printSchema(schema)).toMatchSnapshot();
});
