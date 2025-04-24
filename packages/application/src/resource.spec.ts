import request from "supertest";
import { ApplicationResource } from "./resource";

test("application", async () => {
  const application = new ApplicationResource({
    id: "application",
    kind: "APPLICATION",
    parentId: "ROOT",
    settings: {
      title: "应用",
      description: "应用根资源",
      name: "测试应用",
    },
  });

  const app = await application.createApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
