import { AppData } from "@ldsg/types";
import { generateByAppData } from "./generate-by-app-data";
import { getAppData } from "./get-app-data";

interface GenerateParams {
  lgsgAppDataUrl: string;
  outputPath: string;
  extraAppDataPath?: string;
}

type Generate = (params: GenerateParams) => Promise<void>;

export const generate: Generate = async (params) => {
  const { outputPath } = params;

  const appData: AppData = await getAppData(params);

  await generateByAppData({ appData, outputPath });
};
