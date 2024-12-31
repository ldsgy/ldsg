import JSZip from "jszip";
import _ from "lodash";
import path from "path";
import { AppData, HandlerServiceSettings } from "../../types";
import {
  HANDLER_PACKAGE_JSON_BASE_FILE_INFO,
  HANDLER_SRC_INDEX_TS_FILE_INFO,
  HANDLER_TSCONFIG_JSON_FILE_INFO,
  PNPM_WORKSPACE_YAML_FILE_INFO,
} from "./constants";
import { getHandlerServicePackageJsonContentByModuleData } from "./utils/get-handler-service-package-json-content-by-module-data";

export * from "./constants";
export * from "./utils/get-handler-service-package-json-content-by-module-data";

interface ZipAppDataParams<T extends JSZip.OutputType>
  extends JSZip.JSZipGeneratorOptions<T>,
    AppData {}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type OutputByType<T extends JSZip.OutputType> = UnwrapPromise<
  ReturnType<typeof JSZip.generateAsync<T>>
>;

interface ZipAppDataRes<T extends JSZip.OutputType> {
  archive: OutputByType<T>;
}

export const zipAppData = async <T extends JSZip.OutputType>(
  params: ZipAppDataParams<T>
): Promise<ZipAppDataRes<T>> => {
  const {
    environmentVariables,
    files = [],
    reuseMainAppDependencies = [],
    serviceRecords,
    type,
  } = params;

  const zip = new JSZip();

  zip.file("service-records.json", JSON.stringify(serviceRecords));

  if (environmentVariables) {
    zip.file(
      ".env",
      _.toPairs(environmentVariables).map((value) => value.join("=")).join(`
`)
    );
  }

  const handlerServiceRecords = serviceRecords.filter(
    (value) => value.type === "HANDLER"
  );

  if (handlerServiceRecords.length) {
    zip.file(
      PNPM_WORKSPACE_YAML_FILE_INFO.name,
      PNPM_WORKSPACE_YAML_FILE_INFO.content
    );

    const handlersFolder = zip.folder("handlers");

    if (handlersFolder) {
      _.each(handlerServiceRecords, (handlerServiceRecord) => {
        const { id, settings: handlerServiceRecordSettings } =
          handlerServiceRecord;

        const settings = handlerServiceRecordSettings as HandlerServiceSettings;

        const moduleData = _.get(settings, ["moduleData"]);

        const code = _.get(moduleData, ["code"]);

        const modules = _.get(moduleData, ["modules"]);

        if (code && modules) {
          const handlerFolder = handlersFolder.folder(id);

          if (handlerFolder) {
            // save code in src/index.ts
            {
              const handlerSrcFolder = handlerFolder.folder("src");

              if (handlerSrcFolder) {
                handlerSrcFolder.file(
                  HANDLER_SRC_INDEX_TS_FILE_INFO.name,
                  code
                );
              }
            }

            // save modules in package.json
            {
              const { content } =
                getHandlerServicePackageJsonContentByModuleData({
                  moduleData,
                  moduleName: id,
                  reuseMainAppDependencies,
                });

              handlerFolder.file(
                HANDLER_PACKAGE_JSON_BASE_FILE_INFO.name,
                JSON.stringify(content)
              );
            }

            // save tsconfig.json
            handlerFolder.file(
              HANDLER_TSCONFIG_JSON_FILE_INFO.name,
              JSON.stringify(HANDLER_TSCONFIG_JSON_FILE_INFO.content)
            );
          }
        }
      });
    }
  }

  for (const file of files) {
    const { name, content } = file;

    const extnameRes = path.extname(name);

    let data: string;

    switch (extnameRes) {
      case ".json": {
        data = JSON.stringify(content as object);

        break;
      }

      case ".ts":
      default: {
        data = content as string;

        break;
      }
    }

    zip.file(name, data);
  }

  const archive = await zip.generateAsync({ type });

  const res: ZipAppDataRes<T> = {
    archive,
  };

  return res;
};
