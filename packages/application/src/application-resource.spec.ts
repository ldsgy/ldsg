import request from "supertest";
import { ApplicationResource } from "./application-resource";

test("application", async () => {
  const application = new ApplicationResource({
    id: "APPLICATION",
    kind: "APPLICATION",
    parentId: "ROOT",
    settings: {
      title: "应用",
      description: "应用根资源",
    },
  });

  const app = application.createExpressApplication();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
