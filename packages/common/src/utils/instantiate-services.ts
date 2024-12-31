import { Service } from "@ldsg/core";
import { ServiceRecords, ServiceTypeMap } from "../types";
import {
  InstantiateService,
  instantiateService as instantiateServiceAs,
} from "./instantiate-service";

export interface InstantiateServicesParams {
  serviceRecords: ServiceRecords;
  instantiateService?: InstantiateService;
  serviceTypeMap?: ServiceTypeMap;
}

export interface InstantiateServicesRes {
  services: Service[];
}

export type InstantiateServices = (
  params: InstantiateServicesParams
) => InstantiateServicesRes;

export const instantiateServices: InstantiateServices = (params) => {
  const {
    serviceRecords,
    instantiateService = instantiateServiceAs,
    serviceTypeMap,
  } = params;

  const services = serviceRecords.map((value) => {
    const instantiateServiceRes = instantiateService({
      serviceProperties: value,
      serviceTypeMap,
    });

    const { service } = instantiateServiceRes;

    return service;
  });

  const res: InstantiateServicesRes = {
    services: services.map((value) => {
      const res = value;

      res.services = services;

      return res;
    }),
  };

  return res;
};
