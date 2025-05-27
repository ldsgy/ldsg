import { createApp } from "@ldsg/create-app";
import request from "supertest";
import { blogResourceRecords as resourceRecords } from "../../apps";
import { getResourceRecordsWithHandlerFunction } from "../../utils";

describe("blog", () => {
  test("resource records is completed", () => {
    expect(resourceRecords).toMatchSnapshot();
  });

  describe("app", () => {
    const { resourceRecordsWithHandlerFunction } =
      getResourceRecordsWithHandlerFunction({
        resourceRecords,
      });

    const app = createApp({
      resourceRecords: resourceRecordsWithHandlerFunction,
    });

    test("is health", async () => {
      const response = await request(app).get("/health");

      expect(response.statusCode).toBe(200);

      expect(response.text).toBe("ok");
    });

    test("graphql is health", async () => {
      const response = await request(app).get("/graphql");

      expect(response.statusCode).toBe(200);

      expect(response.text).toMatchSnapshot();
    });
  });
});
