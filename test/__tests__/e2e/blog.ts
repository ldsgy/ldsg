import { createApp } from "@ldsg/create-app";
import request from "supertest";
import { blogResourceRecords as resourceRecords } from "../../apps";

describe("blog", () => {
  test("resource records is completed", () => {
    expect(resourceRecords).toMatchSnapshot();
  });

  describe("app", () => {
    const app = createApp({
      resourceRecords,
    });

    test("is health", async () => {
      const response = await request(app).get("/health");

      expect(response.statusCode).toBe(200);

      expect(response.text).toBe("Hello, World!");
    });
  });
});
