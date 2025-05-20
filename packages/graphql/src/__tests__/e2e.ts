import { ApplicationResource } from "@ldsg/application";
import request from "supertest";
import { GraphqlResource } from "../resource";

test("e2e", async () => {
  const applicationResource = new ApplicationResource({
    id: "application",
    kind: "application",
    parentId: "ROOT",
    settings: {
      title: "应用",
      description: "应用根资源",
      name: "测试应用",
    },
  });

  new GraphqlResource({
    id: "graphql",
    kind: "graphql",
    parentId: "application",
    settings: {
      title: "",
      description: "",
      graphqlEndpoint: "/test-graphql",
    },
  });

  const app = applicationResource.createExpressApp();

  const response = await request(app).get("/test-graphql");

  expect(response.statusCode).toBe(200);

  expect(response.text).toMatchSnapshot();
});
