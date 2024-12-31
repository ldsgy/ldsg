import { Service, ServiceProperties } from "@ldsg/core";
import { ServiceRecords, ServiceTypeMap } from "../types";
import { instantiateServices } from "./instantiate-services";

export interface InstantiateServiceParams {
  serviceProperties: ServiceProperties;
  serviceRecords?: ServiceRecords;
  serviceTypeMap?: ServiceTypeMap;
}

export interface InstantiateServiceRes {
  service: Service;
}

export type InstantiateService = (
  params: InstantiateServiceParams
) => InstantiateServiceRes;

export const instantiateService: InstantiateService = (params) => {
  const { serviceProperties, serviceRecords, serviceTypeMap } = params;

  const { type } = serviceProperties;

  if (!type) {
    throw new Error("service type is required");
  }

  const ServiceConstructor = serviceTypeMap?.[type]?.class || Service;

  const service = new ServiceConstructor(serviceProperties);

  if (serviceRecords) {
    const { services } = instantiateServices({
      serviceRecords,
      serviceTypeMap,
    });

    service.services = services;
  }

  const res: InstantiateServiceRes = {
    service,
  };

  return res;
};
