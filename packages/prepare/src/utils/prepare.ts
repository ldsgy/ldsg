import { AppData, zipAppData } from "@ldsg/common";
import AdmZip from "adm-zip";
import _ from "lodash";

interface Params extends AppData {
  outputPath: string;
}

type Prepare = (params: Params) => Promise<void>;

export const prepare: Prepare = async (params) => {
  const { outputPath } = params;

  const { archive } = await zipAppData({
    ..._.omit(params, "outputPath"),
    type: "nodebuffer",
  });

  const admZip = new AdmZip(archive);

  admZip.extractAllTo(outputPath, true);
};
