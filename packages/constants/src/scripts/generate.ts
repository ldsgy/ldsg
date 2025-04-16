import { Manifest } from "@ldsg/resource";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";
import { ROOT_RESOURCE_ID } from "../constants";
import { getConstants } from "../utils";

const main = async () => {
  const fileNameManifestMap: Record<
    string,
    {
      resources: Manifest.Resource[];
    }
  > = {
    app: {
      resources: [
        {
          id: "main-app",
          kind: "APPLICATION",
          parentId: ROOT_RESOURCE_ID,
          settings: {
            title: "主要应用",
            description: "",
          },
        },
      ],
    },
  };

  const manifestsDirPath = path.join(__dirname, "..", "manifests");

  await fs.ensureDir(manifestsDirPath);

  const fileNames = _.keys(fileNameManifestMap);

  for (const fileName of fileNames) {
    const { resources } = fileNameManifestMap[fileName];

    const { manifest } = getConstants({
      resources,
    });

    await fs.writeJson(
      path.join(manifestsDirPath, `${fileName}.json`),
      manifest
    );
  }

  const INDEX_TS_CODE = fileNames.map(
    (fileName) => `import ${_.upperCase(
      fileName
    )}_JSON from "./${fileName}.json";
export const ${_.camelCase(fileName)}Manifest = ${_.upperCase(fileName)}_JSON;`
  ).join(`
`);

  await fs.writeFile(path.join(manifestsDirPath, "index.ts"), INDEX_TS_CODE);
};

main();
