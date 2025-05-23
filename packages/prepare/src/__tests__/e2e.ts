import { APP_MANIFEST } from "@ldsg/constants";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prepare } from "../utils/prepare";

const appsDirPath = path.join(os.tmpdir(), uuidv4(), "apps");

const currentAppDirPath = path.join(appsDirPath, "main");

beforeEach(async () => {
  await fs.rm(currentAppDirPath, { force: true, recursive: true });
});

test("prepare", async () => {
  const appData = extendAppData({
    appData: APP_MANIFEST,
    extraAppData: {
      reuseMainAppDependencies: [
        "graphql",
        "graphql-middleware",
        "graphql-shield",
      ],
    },
  });

  await prepare({
    ...appData,
    outputPath: currentAppDirPath,
  });
});
