import { ApplicationResource } from "@ldsg/application";
import request from "supertest";
import { GraphqlResource } from "./resource";

test("application", async () => {
  const applicationResource = new ApplicationResource({
    id: "application",
    kind: "APPLICATION",
    parentId: "ROOT",
    settings: {
      title: "应用",
      description: "应用根资源",
      name: "测试应用",
    },
  });

  new GraphqlResource({
    id: "graphql",
    kind: "GRAPHQL",
    parentId: "application",
    settings: {
      title: "",
      description: "",
      graphqlEndpoint: "/test-graphql",
    },
  });

  const app = await applicationResource.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, 测试应用!");

  const response2 = await request(app).get("/test-graphql");

  expect(response2.statusCode).toBe(200);

  expect(response2.text).toMatchSnapshot();
});
