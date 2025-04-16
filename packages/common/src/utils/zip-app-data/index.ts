import {
  resourceDefinitionResourceSettings as handlerResourceDefinitionResourceSettings,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import JSZip from "jszip";
import _ from "lodash";
import path from "path";
import { AppData } from "../../types";
import {
  HANDLER_PACKAGE_JSON_BASE_FILE_INFO,
  HANDLER_SRC_INDEX_TS_FILE_INFO,
  HANDLER_TSCONFIG_JSON_FILE_INFO,
  PNPM_WORKSPACE_YAML_FILE_INFO,
} from "./constants";
import { getHandlerPackageJson } from "./utils";

export * from "./constants";
export * from "./utils";

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

type ZipAppData = <T extends JSZip.OutputType>(
  params: ZipAppDataParams<T>
) => Promise<ZipAppDataRes<T>>;

export const zipAppData: ZipAppData = async (params) => {
  const {
    environmentVariables,
    files = [],
    resources: manifestResources,
    reuseMainAppDependencies = [],
    type,
  } = params;

  const zip = new JSZip();

  zip.file("manifest.json", JSON.stringify(_.pick(params, "resources")));

  if (environmentVariables) {
    zip.file(
      ".env",
      _.toPairs(environmentVariables).map((value) => value.join("=")).join(`
`)
    );
  }

  const handlerManifestResources = manifestResources.filter(
    (value) => value.kind === handlerResourceDefinitionResourceSettings.kind
  ) as Manifest.Resource<HandlerResourceSettings>[];

  if (handlerManifestResources.length) {
    zip.file(
      PNPM_WORKSPACE_YAML_FILE_INFO.name,
      PNPM_WORKSPACE_YAML_FILE_INFO.content
    );

    const handlersFolder = zip.folder("handlers");

    if (handlersFolder) {
      _.each(handlerManifestResources, (handlerManifestResource) => {
        const { id, settings } = handlerManifestResource;

        const { code, dependencies } = settings;

        const handlerFolder = handlersFolder.folder(id);

        if (handlerFolder) {
          // save code in src/index.ts
          {
            const handlerSrcFolder = handlerFolder.folder("src");

            if (handlerSrcFolder) {
              handlerSrcFolder.file(HANDLER_SRC_INDEX_TS_FILE_INFO.name, code);
            }
          }

          // save modules in package.json
          {
            const { packageJson } = getHandlerPackageJson({
              moduleName: id,
              dependencies,
              reuseMainAppDependencies,
            });

            handlerFolder.file(
              HANDLER_PACKAGE_JSON_BASE_FILE_INFO.name,
              JSON.stringify(packageJson)
            );
          }

          // save tsconfig.json
          handlerFolder.file(
            HANDLER_TSCONFIG_JSON_FILE_INFO.name,
            JSON.stringify(HANDLER_TSCONFIG_JSON_FILE_INFO.content)
          );
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

  const res = {
    archive,
  };

  return res;
};
