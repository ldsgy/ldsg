import {
  APP_MANIFEST,
  FILES_IN_HANDLER_MODULE,
  FILES_IN_ROOT_MODULE,
} from "@ldsg/constants";
import { prepare } from "@ldsg/prepare";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import path from "path";
import shell from "shelljs";
import request from "supertest";

const appsDirPath = path.join(__dirname, "..", "..", "dist", "apps");

const currentAppDirPath = path.join(appsDirPath, "main");

beforeEach(async () => {
  await fs.rm(currentAppDirPath, { force: true, recursive: true });

  const appData = extendAppData({
    appData: APP_MANIFEST,
    extraAppData: {
      reuseMainAppDependencies: [
        "graphql",
        "graphql-middleware",
        "graphql-shield",
      ],
      filesInRootModele: [
        ...FILES_IN_ROOT_MODULE,
        {
          path: "index.ts",
          /**
           * replace code in index.ts for export app
           */
          data: `import { createApp } from "@ldsg/create-app";
import MANIFEST_JSON from "./manifest.json";

const { resourceRecords } = MANIFEST_JSON;

export const app = createApp({
  resourceRecords,
});
`,
        },
      ],
      filesInHandlerModele: FILES_IN_HANDLER_MODULE,
    },
  });

  await prepare({
    ...appData,
    outputPath: currentAppDirPath,
  });

  shell.cd(currentAppDirPath);

  shell.exec("pnpm i");

  shell.exec("pnpm build");
});

test("prepare", async () => {
  const currentAppDistDirPath = path.join(currentAppDirPath, "dist");

  const { app } = require(currentAppDistDirPath);

  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
