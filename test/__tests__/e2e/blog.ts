import { createApp } from "@ldsg/create-app";
import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "@ldsg/handler";
import request from "supertest";
import { transpile } from "typescript";
import vm from "vm";
import { blogResourceRecords as resourceRecords } from "../../apps";

const runIsolated = (code: string): any => {
  // 创建新的沙箱对象，包含独立的 exports 和 module
  const sandbox = {
    exports: {},
    require: require,
    module: { exports: {} },
    console: console,
  };
  // 确保 module.exports 引用正确
  sandbox.module.exports = sandbox.exports;

  // 创建上下文并运行代码
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  // 返回当前沙箱的导出结果
  return sandbox.exports;
};

describe("blog", () => {
  test("resource records is completed", () => {
    expect(resourceRecords).toMatchSnapshot();
  });

  const resourceRecordsWithHandlerFunction = resourceRecords.map(
    (resourceRecord) => {
      const { kind, settings } = resourceRecord;

      let res = resourceRecord;

      switch (kind) {
        case HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind: {
          const { code: tsCode, handler } = settings;

          if (!handler) {
            const jsCode = transpile(tsCode);

            const handler = runIsolated(jsCode).handler;

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

        default: {
          break;
        }
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

      expect(response.text).toBe("ok");
    });

    test("graphql is health", async () => {
      const response = await request(app).get("/graphql");

      expect(response.statusCode).toBe(200);

      expect(response.text).toMatchSnapshot();
    });
  });
});
