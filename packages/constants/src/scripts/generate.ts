import { AppDataFile } from "@ldsg/types";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";
import { BASE_RESOURCE_KINDS, MANIFEST_LIST } from "../constants";
import {
  getManifestByResourceRecordsWithResourceModules,
  isJSONString,
} from "../utils";

const main = async () => {
  const jsonList: {
    name: string;
    data: object;
  }[] = [
    {
      name: "base-resource-kinds",
      data: BASE_RESOURCE_KINDS,
    },
  ];

  for (const element of MANIFEST_LIST) {
    const { name, resourceRecords } = element;

    const { manifest } = getManifestByResourceRecordsWithResourceModules({
      resourceRecords,
    });

    jsonList.push({
      name: `${name}-manifest`,
      data: manifest,
    });
  }

  /**
   * 处理应用模板内文件
   */
  {
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
          data: isJSONString(readFileRes)
            ? JSON.parse(readFileRes)
            : readFileRes,
        });
      }
    }

    jsonList.push({
      name: "files-in-root-module",
      data: filesInRootModule,
    });
  }

  /**
   * 向 dist 目录写入全部文件
   */
  {
    const distDirPath = path.join(__dirname, "..", "dist");

    await fs.ensureDir(distDirPath);

    for (const element of jsonList) {
      const { name, data } = element;

      await fs.writeFile(
        `${path.join(distDirPath, name)}.json`,
        JSON.stringify(data)
      );
    }

    const indexTsCode = jsonList.map((value) => {
      const { name } = value;

      const snakeCaseUpperName = _.toUpper(_.snakeCase(name));

      return `import ${snakeCaseUpperName}_JSON from "./${name}.json";
export const ${snakeCaseUpperName} = ${snakeCaseUpperName}_JSON;`;
    }).join(`
`);

    await fs.writeFile(path.join(distDirPath, "index.ts"), indexTsCode);
  }
};

main();
