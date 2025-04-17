import { appManifest } from "@ldsg/constants";
import { prepare } from "@ldsg/prepare";
import { extendAppData } from "@ldsg/utils";
import fs from "fs-extra";
import path from "path";

test("prepare", async () => {
  const appsDir = path.join(__dirname, "..", "..", "apps");

  await fs.rm(appsDir, { force: true, recursive: true });

  const appData = extendAppData({
    appData: appManifest,
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
    outputPath: path.join(appsDir, "main"),
  });
});
