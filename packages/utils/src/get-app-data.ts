import { AppData } from "@ldsg/types";
import { extendAppDataWithPath } from "./extend-app-data-with-path";
import { fetchAppData, FetchAppDataParams } from "./fetch-app-data";

interface GetAppDataParams extends FetchAppDataParams {
  extraAppDataPath?: string;
}

type GetAppData = (params: GetAppDataParams) => Promise<AppData>;

export const getAppData: GetAppData = async (params) => {
  const { extraAppDataPath } = params;

  const appData = await fetchAppData(params);

  const res: AppData = await extendAppDataWithPath({
    appData,
    extraAppDataPath,
  });

  return res;
};
