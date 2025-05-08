import { ApplicationResource } from "@ldsg/application";
import { HandlerResource } from "@ldsg/handler";
import { RequestHandler } from "express";
import request from "supertest";
import { RouteResource } from "../resource";

const handler: RequestHandler = (req, res) => {
  res.send("Hello, World!");
};

test("application", async () => {
  const applicationResource = new ApplicationResource({
    id: "application",
    kind: "APPLICATION",
    parentId: "root",
    settings: {
      title: "应用",
      description: "应用根资源",
      name: "测试应用",
    },
  });

  new RouteResource({
    id: "route",
    kind: "ROUTE",
    parentId: "application",
    settings: {
      title: "应用",
      description: "应用根资源",
      path: "/test",
      handlerResourceId: "route-test-app-test-handler",
    },
  });

  new HandlerResource({
    id: "route-test-app-test-handler",
    kind: "HANDLER",
    parentId: "root",
    settings: {
      title: "应用",
      description: "应用根资源",
      code: "",
      dependencies: [],
    },
    handler,
  });

  const app = applicationResource.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, 测试应用!");

  const response2 = await request(app).get("/test");

  expect(response2.statusCode).toBe(200);

  expect(response2.text).toBe("Hello, World!");
});
