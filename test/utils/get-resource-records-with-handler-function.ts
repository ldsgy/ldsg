import { RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as HANDLER_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS } from "@ldsg/handler";
import { ResourceRecord } from "@ldsg/types";
import { transpile } from "typescript";
import vm from "vm";

interface GetResourceRecordsWithHandlerFunctionParams {
  resourceRecords: ResourceRecord[];
}

interface GetResourceRecordsWithHandlerFunctionRes {
  resourceRecordsWithHandlerFunction: ResourceRecord[];
}

type GetResourceRecordsWithHandlerFunction = (
  params: GetResourceRecordsWithHandlerFunctionParams
) => GetResourceRecordsWithHandlerFunctionRes;

export const getResourceRecordsWithHandlerFunction: GetResourceRecordsWithHandlerFunction =
  (params) => {
    const { resourceRecords } = params;

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

    const res = {
      resourceRecordsWithHandlerFunction,
    };

    return res;
  };

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
