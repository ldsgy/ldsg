import { AppData } from "@ldsg/types";
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
