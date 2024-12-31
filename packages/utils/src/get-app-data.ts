import { AppData } from "@ldsg/common";
import { extendAppData } from "./extend-app-data";
import { fetchAppData, FetchAppDataParams } from "./fetch-app-data";

interface GetAppDataParams extends FetchAppDataParams {
  extraAppDataPath?: string;
}

type GetAppData = (params: GetAppDataParams) => Promise<AppData>;

export const getAppData: GetAppData = async (params) => {
  const { extraAppDataPath } = params;

  const appData = await fetchAppData(params);

  const res: AppData = await extendAppData({
    appData,
    extraAppDataPath,
  });

  return res;
};
