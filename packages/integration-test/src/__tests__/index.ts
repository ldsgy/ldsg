import { APP_MANIFEST, FILES_IN_ROOT_MODULE } from "@ldsg/constants";
import { prepare } from "@ldsg/prepare";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import path from "path";
import shell from "shelljs";
import request from "supertest";
import { app } from "../../apps/main/dist";

const appsDirPath = path.join(__dirname, "..", "..", "apps");

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
          data: `import { createApp } from "@ldsg/create-app";
import MANIFEST_JSON from "./manifest.json";

const { resourceRecords } = MANIFEST_JSON;

export const app = createApp({
  resourceRecords,
});
`,
        },
      ],
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
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);

  expect(response.text).toBe("Hello, World!");
});
