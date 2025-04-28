import { ApplicationResource } from "@ldsg/application";
import request from "supertest";
import { ObjectFieldResource } from "./resource";

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

  new ObjectFieldResource({
    id: "object-field",
    kind: "OBJECT_FIELD",
    parentId: "application",
    settings: {
      title: "",
      description: "",
      name: "",
      fieldTypeResourceId: "",
      properties: {},
    },
  });

  const app = await applicationResource.createExpressApp();

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, 测试应用!");

  const response2 = await request(app).get("/test-objectfield");

  expect(response2.statusCode).toBe(200);

  expect(response2.text).toMatchSnapshot();
});
