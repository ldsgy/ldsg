import { AppData } from "@ldsg/common";
import axios from "axios";

export interface FetchAppDataParams {
  lgsgAppDataUrl: string;
}

type FetchAppData = (params: FetchAppDataParams) => Promise<AppData>;

export const fetchAppData: FetchAppData = async (params) => {
  const { lgsgAppDataUrl: url } = params;

  const axiosRes = await axios({
    url,
  });

  const res: AppData = axiosRes.data;

  return res;
};
