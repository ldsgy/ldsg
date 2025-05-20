import { Resource } from "@ldsg/resource";
import request from "supertest";
import { ApplicationResource, ExtendExpressApp } from "../resource";

export class AResource extends Resource {
  extendExpressApp: ExtendExpressApp = (params) => {
    const { app } = params;

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });
  };
}

test("application", async () => {
  const application = new ApplicationResource({
    id: "test-application",
    kind: "application",
    parentId: "ROOT",
    settings: {
      title: "测试应用",
      description: "",
      name: "",
    },
  });

  new AResource({
    id: "test-a",
    kind: "a",
    parentId: "test-application",
    settings: {
      title: "",
      description: "",
    },
  });

  const app = application.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
