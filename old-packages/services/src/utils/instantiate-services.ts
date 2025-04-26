import {
  InstantiateServices,
  instantiateServices as instantiateServicesAs,
} from "@ldsg/common";
import { SERVICE_TYPE_MAP } from "../constants";

export const instantiateServices: InstantiateServices = (params) => {
  const { serviceTypeMap = SERVICE_TYPE_MAP } = params;

  const res = instantiateServicesAs({
    ...params,
    serviceTypeMap,
  });

  return res;
};
