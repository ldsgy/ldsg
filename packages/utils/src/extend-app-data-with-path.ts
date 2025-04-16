import { AppData } from "@ldsg/common";
import fs from "fs-extra";
import { extendAppData } from "./extend-app-data";

export interface ExtendAppDataWithPathParams {
  appData: AppData;
  extraAppDataPath?: string;
}

type ExtendAppDataWithPath = (
  params: ExtendAppDataWithPathParams
) => Promise<AppData>;

export const extendAppDataWithPath: ExtendAppDataWithPath = async (params) => {
  const { appData, extraAppDataPath } = params;

  let extraAppData = {};

  if (extraAppDataPath) {
    const existsRes = await fs.exists(extraAppDataPath);

    if (existsRes) {
      extraAppData = await fs.readJson(extraAppDataPath);
    }
  }

  const res = extendAppData({
    appData,
    extraAppData,
  });

  return res;
};
