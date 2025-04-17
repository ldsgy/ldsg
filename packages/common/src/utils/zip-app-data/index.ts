import {
  resourceDefinitionResourceSettings as handlerResourceDefinitionResourceSettings,
  HandlerResourceSettings,
} from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import JSZip from "jszip";
import _ from "lodash";
import { AppData, AppDataFileData } from "../../types";
import { FILES_IN_HANDLER_MODELE, FILES_IN_ROOT_MODELE } from "./constants";
import {
  addFileToZipFolder,
  getHandlerPackageJson,
  PackageJson,
} from "./utils";

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
    filesInHandlerModele = FILES_IN_HANDLER_MODELE,
    filesInRootModele = FILES_IN_ROOT_MODELE,
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
          for (const file of filesInHandlerModele) {
            const { path } = file;

            let data: AppDataFileData;

            switch (path) {
              case "src/index.ts": {
                data = code;

                break;
              }

              case "package.json": {
                const { packageJson } = getHandlerPackageJson({
                  packageJson: file.data as PackageJson,
                  moduleName: id,
                  dependencies,
                  reuseMainAppDependencies,
                });

                data = packageJson;

                break;
              }

              default: {
                if ("data" in file) {
                  data = file.data;
                }

                break;
              }
            }

            if (data) {
              addFileToZipFolder({
                folder: handlerFolder,
                path,
                data,
              });
            }
          }
        }
      });
    }
  }

  for (const file of filesInRootModele) {
    const { path } = file;

    let data: AppDataFileData;

    switch (path) {
      case "package.json": {
        const packageJson = file.data as PackageJson;

        data = {
          ...packageJson,
          dependencies: {
            ..._.fromPairs(
              handlerManifestResources.map((handlerManifestResource) => {
                const { id: moduleName } = handlerManifestResource;

                return [moduleName, `link:handlers/${moduleName}`];
              })
            ),
            ...packageJson,
          },
        };

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
        if ("data" in file) {
          data = file.data;
        }

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

  const archive = await zip.generateAsync({ type });

  const res = {
    archive,
  };

  return res;
};
