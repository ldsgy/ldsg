import { APP_MANIFEST } from "@ldsg/constants";
import request from "supertest";
import { createApp } from "./create-app";

test("create app", async () => {
  const app = createApp(APP_MANIFEST);

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
