import AdmZip from "adm-zip";
import { zipAppData } from "..";
import MANIFEST_JSON from "./manifest.json";

test("zip app data", async () => {
  const { resources } = MANIFEST_JSON;

  const { archive } = await zipAppData({
    resources,
    type: "nodebuffer",
  });

  const admZip = new AdmZip(archive);

  const zipEntries = admZip.getEntries();

  const files: {
    name: string;
    type: "DIRECTORY" | "FILE";
    content?: string;
  }[] = [];

  zipEntries.forEach((zipEntry) => {
    files.push({
      name: zipEntry.entryName,
      type: zipEntry.isDirectory ? "DIRECTORY" : "FILE",
      ...(zipEntry.isDirectory
        ? {}
        : {
            content: zipEntry.getData().toString("utf8"),
          }),
    });
  });

  expect(files).toMatchSnapshot();
});
