import { AppDataFile } from "@ldsg/types";
import fs from "fs-extra";
import _ from "lodash";
import path from "path";
import {
  BASE_RESOURCE_KINDS,
  MANIFEST_LIST,
  ROOT_RESOURCE_ID,
  ROOT_RESOURCE_KIND,
} from "../constants";
import {
  getManifestByResourceRecordsWithResourceModules,
  isJSONString,
} from "../utils";

const main = async () => {
  const jsonList: {
    name: string;
    data: object | string;
  }[] = [
    {
      name: "base-resource-kinds",
      data: BASE_RESOURCE_KINDS,
    },
    {
      name: "root-resource-id",
      data: ROOT_RESOURCE_ID,
    },
    {
      name: "root-resource-kind",
      data: ROOT_RESOURCE_KIND,
    },
    {
      name: "resource-module-related-resource-records",
      data: getManifestByResourceRecordsWithResourceModules({
        resourceRecords: [],
      }).manifest.resourceRecords,
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
    const templatesDirPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "templates"
    );

    const appTemplateRootDirPath = path.join(templatesDirPath, "app");

    const appTemplateRootDirRes = await fs.readdir(appTemplateRootDirPath);

    /**
     * 处理根模块内文件
     */
    {
      const filesInRootModule: AppDataFile[] = [];

      for (const fileName of appTemplateRootDirRes) {
        const filePath = path.join(appTemplateRootDirPath, fileName);

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
     * 处理 handler 模板内文件
     */
    {
      const handlerTemplateDirPath = path.join(
        templatesDirPath,
        "handlers",
        "handler"
      );

      const filesInHandlerModule: AppDataFile[] = [];

      const handlerTemplateDirRes = await fs.readdir(handlerTemplateDirPath);

      for (const fileName of handlerTemplateDirRes) {
        const filePath = path.join(handlerTemplateDirPath, fileName);

        const stats = await fs.stat(filePath);

        if (!stats.isDirectory()) {
          const readFileRes = await fs.readFile(filePath, "utf8");

          filesInHandlerModule.push({
            path: fileName,
            data: isJSONString(readFileRes)
              ? JSON.parse(readFileRes)
              : readFileRes,
          });
        }
      }

      jsonList.push({
        name: "files-in-handler-module",
        data: filesInHandlerModule,
      });
    }
  }

  /**
   * 向 src 目录写入全部文件
   */
  {
    const constantsSrcPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "constants",
      "src"
    );

    await fs.ensureDir(constantsSrcPath);

    for (const element of jsonList) {
      const { name, data } = element;

      await fs.writeFile(
        `${path.join(constantsSrcPath, name)}.json`,
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

    await fs.writeFile(path.join(constantsSrcPath, "index.ts"), indexTsCode);
  }
};

main();
