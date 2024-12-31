import {
  InstantiateService,
  instantiateService as instantiateServiceAs,
} from "@ldsg/common";
import { SERVICE_TYPE_MAP } from "../constants";

export const instantiateService: InstantiateService = (params) => {
  const { serviceTypeMap = SERVICE_TYPE_MAP } = params;

  const res = instantiateServiceAs({
    ...params,
    serviceTypeMap,
  });

  return res;
};
