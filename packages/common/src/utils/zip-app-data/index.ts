import {
  resourceDefinitionResourceSettings as handlerResourceDefinitionResourceSettings,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import JSZip from "jszip";
import _ from "lodash";
import { AppData, AppDataFileData } from "../../types";
import { FILES_IN_HANDLER_MODELE, FILES_IN_ROOT_MODELE } from "./constants";
import { addFileToZipFolder, getHandlerPackageJson } from "./utils";

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

  const handlerManifestResources = manifestResources.filter(
    (value) => value.kind === handlerResourceDefinitionResourceSettings.kind
  ) as Manifest.Resource<HandlerResourceSettings>[];

  if (handlerManifestResources.length) {
    const handlersFolder = zip.folder("handlers");

    if (handlersFolder) {
      _.each(handlerManifestResources, (handlerManifestResource) => {
        const { id, settings } = handlerManifestResource;

        const { code, dependencies } = settings;

        const handlerFolder = handlersFolder.folder(id);

        if (handlerFolder) {
          for (const file of FILES_IN_HANDLER_MODELE) {
            const { path } = file;

            let data: AppDataFileData | undefined;

            switch (path) {
              case "src/index.ts": {
                data = code;

                break;
              }

              case "package.json": {
                const { packageJson } = getHandlerPackageJson({
                  packageJson: file.data,
                  moduleName: id,
                  dependencies,
                  reuseMainAppDependencies,
                });

                data = packageJson;

                break;
              }

              default: {
                data = file.data;

                break;
              }
            }

            if (data) {
              addFileToZipFolder({
                folder: zip,
                path,
                data,
              });
            }
          }
        }
      });
    }
  }

  for (const file of FILES_IN_ROOT_MODELE) {
    const { path } = file;

    let data: AppDataFileData | undefined;

    switch (path) {
      case "package.json": {
        break;
      }

      case "manifest.json": {
        data = _.pick(params, "resources");

        break;
      }

      case ".env": {
        if (environmentVariables) {
          data = _.toPairs(environmentVariables).map((value) => value.join("="))
            .join(`
`);
        }

        break;
      }

      default: {
        break;
      }
    }

    if (data) {
      addFileToZipFolder({
        folder: zip,
        path,
        data,
      });
    }
  }

  for (const file of files) {
    const { path, data } = file;

    addFileToZipFolder({
      folder: zip,
      path,
      data,
    });
  }

  const archive = await zip.generateAsync({ type });

  const res = {
    archive,
  };

  return res;
};
