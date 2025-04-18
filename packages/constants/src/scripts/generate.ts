import { AppDataFile } from "@ldsg/common";
import { ResourceRecord } from "@ldsg/resource";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";
import { ROOT_RESOURCE_ID } from "../constants";
import { getConstants, isJSONString } from "../utils";

const main = async () => {
  const fileNameManifestMap: Record<
    string,
    {
      resources: ResourceRecord[];
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

  const distDirPath = path.join(__dirname, "..", "dist");

  const distDirIndexTsCode = `export * from "./manifests";
import FILES_IN_ROOT_MODULE_JSON from "./files-in-root-module.json";
export const FILES_IN_ROOT_MODULE = FILES_IN_ROOT_MODULE_JSON;
`;

  await fs.writeFile(path.join(distDirPath, "index.ts"), distDirIndexTsCode);

  await fs.ensureDir(distDirPath);

  const manifestsDirPath = path.join(distDirPath, "manifests");

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

  const manifestsDirIndexTsCode = fileNames.map(
    (fileName) => `import ${_.upperCase(
      fileName
    )}_JSON from "./${fileName}.json";
export const ${_.upperCase(fileName)}_MANIFEST = ${_.upperCase(fileName)}_JSON;`
  ).join(`
`);

  await fs.writeFile(
    path.join(manifestsDirPath, "index.ts"),
    manifestsDirIndexTsCode
  );

  const appTemplateDirPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "app-template"
  );

  const readAppTemplateDirRes = await fs.readdir(appTemplateDirPath);

  const filesInRootModule: AppDataFile[] = [];

  for (const fileName of readAppTemplateDirRes) {
    const filePath = path.join(appTemplateDirPath, fileName);

    const stats = await fs.stat(filePath);

    if (!stats.isDirectory()) {
      const readFileRes = await fs.readFile(filePath, "utf8");

      filesInRootModule.push({
        path: fileName,
        data: isJSONString(readFileRes) ? JSON.parse(readFileRes) : readFileRes,
      });
    }
  }

  await fs.writeFile(
    path.join(distDirPath, "files-in-root-module.json"),
    JSON.stringify(filesInRootModule)
  );
};

main();
