import { appManifest } from "@ldsg/constants";
import path from "path";
import { prepare } from "..";

test("prepare", async () => {
  await prepare({
    ...appManifest,
    outputPath: path.join(__dirname, "apps", "main"),
  });
});
