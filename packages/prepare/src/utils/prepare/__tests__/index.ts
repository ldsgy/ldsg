import path from "path";
import { prepare } from "..";
import MANIFEST_JSON from "./manifest.json";

describe("prepare", async () => {
  await prepare({
    ...MANIFEST_JSON,
    outputPath: path.join(__dirname, "apps", "main"),
  });
});
