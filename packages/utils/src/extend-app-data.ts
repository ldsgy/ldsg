import { AppData } from "@ldsg/common";

export interface ExtendAppDataParams {
  appData: AppData;
  extraAppData?: Partial<AppData>;
}

type ExtendAppData = (params: ExtendAppDataParams) => AppData;

export const extendAppData: ExtendAppData = (params) => {
  const { appData, extraAppData } = params;

  const res: AppData = {
    ...extraAppData,
    ...appData,
  };

  return res;
};
