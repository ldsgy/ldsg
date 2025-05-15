import { APP_MANIFEST } from "@ldsg/constants";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import path from "path";
import { prepare } from "./prepare";

const appsDirPath = path.join(__dirname, "..", "..", "apps");

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
