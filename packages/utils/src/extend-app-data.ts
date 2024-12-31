import { AppData } from "@ldsg/common";
import fs from "fs-extra";

export interface ExtendAppDataParams {
  appData: AppData;
  extraAppDataPath?: string;
}

type ExtendAppData = (params: ExtendAppDataParams) => Promise<AppData>;

export const extendAppData: ExtendAppData = async (params) => {
  const { appData, extraAppDataPath } = params;

  let extraAppData = {};

  if (extraAppDataPath) {
    const existsRes = await fs.exists(extraAppDataPath);

    if (existsRes) {
      extraAppData = await fs.readJson(extraAppDataPath);
    }
  }

  const res: AppData = {
    ...extraAppData,
    ...appData,
  };

  return res;
};
