import { createApp } from "@ldsg/create-app";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "@ldsg/handler";
import request from "supertest";
import {} from "typescript";
import { blogResourceRecords as resourceRecords } from "../../apps";

describe("blog", () => {
  test("resource records is completed", () => {
    expect(resourceRecords).toMatchSnapshot();
  });

  const resourceRecordsWithHandlerFunction = resourceRecords.map(
    (resourceRecord) => {
      const { id, kind, settings } = resourceRecord;

      let res = resourceRecord;

      switch (kind) {
        case HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind: {
          const { code: tsCode, handler: settingsHandler } = settings;

          console.debug("id", id);

          console.debug("tsCode", tsCode);

          const jsCode = tsCode;

          const handler = new Function(jsCode);

          if (!settingsHandler) {
            res = {
              ...resourceRecord,
              settings: {
                ...settings,
                handler,
              },
            };
          }

          break;
        }

        default:
          break;
      }

      return res;
    }
  );

  describe("app", () => {
    const app = createApp({
      resourceRecords: resourceRecordsWithHandlerFunction,
    });

    test("is health", async () => {
      const response = await request(app).get("/health");

      expect(response.statusCode).toBe(200);

      expect(response.text).toBe("Hello, World!");
    });
  });
});
