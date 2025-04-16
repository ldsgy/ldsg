import fs from "fs-extra";
import path from "path";
import { getConstants } from "./utils";

const main = async () => {
  const { manifest } = getConstants();

  const distDirPath = path.join(__dirname, "..", "dist");

  await fs.ensureDir(distDirPath);

  await fs.writeJson(path.join(distDirPath, "manifest.json"), manifest);
};

main();
