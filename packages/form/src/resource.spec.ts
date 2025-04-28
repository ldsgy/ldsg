import request from "supertest";
import { FormResource } from "./resource";

test("application", async () => {
  new FormResource({
    id: "test-form-id",
    kind: "FORM",
    parentId: "test-forms-id",
    settings: {
      title: "测试表单",
      description: "",
      name: "test-form",
    },
  });

  const app = applicationResource.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, 测试应用!");

  const response2 = await request(app).get("/test-form");

  expect(response2.statusCode).toBe(200);

  expect(response2.text).toMatchSnapshot();
});
