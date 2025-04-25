import { ApplicationResource } from "@ldsg/application";
import request from "supertest";
import { RouteResource } from "./resource";

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

  const routeResource = new RouteResource({
    id: "route",
    kind: "ROUTE",
    parentId: "application",
    settings: {
      title: "应用",
      description: "应用根资源",
      path: "/test",
      handlerResourceId: "",
    },
  });

  const app = await applicationResource.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, 测试应用!");

  const response2 = await request(app).get("/test");

  expect(response2.statusCode).toBe(200);

  expect(response2.text).toBe("Hello, /test!");
});
