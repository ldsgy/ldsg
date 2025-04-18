import { APP_MANIFEST } from "@ldsg/constants";
import { prepare } from "@ldsg/prepare";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import path from "path";

test("prepare", async () => {
  const appsDirPath = path.join(__dirname, "..", "..", "apps");

  const currentAppDirPath = path.join(appsDirPath, "main");

  await fs.rm(currentAppDirPath, { force: true, recursive: true });

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
