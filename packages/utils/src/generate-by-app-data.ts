import { AppData, zipAppData } from "@ldsg/common";
import AdmZip from "adm-zip";

interface GenerateByAppDataParams {
  appData: AppData;
  outputPath: string;
}

type GenerateByAppData = (params: GenerateByAppDataParams) => Promise<void>;

export const generateByAppData: GenerateByAppData = async (params) => {
  const { appData, outputPath } = params;

  const zipAppDataRes = await zipAppData({
    ...appData,
    type: "nodebuffer",
  });

  const { archive } = zipAppDataRes;

  const admZip = new AdmZip(archive);

  admZip.extractAllTo(outputPath, true);
};
