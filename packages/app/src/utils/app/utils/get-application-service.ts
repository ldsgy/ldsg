import { instantiateServices, InstantiateServicesParams } from "@ldsg/common";
import { ApplicationService } from "@ldsg/services";

export interface GetApplicationServiceParams extends InstantiateServicesParams {
  applicationServiceId?: string;
}

export interface GetApplicationServiceRes {
  applicationService: ApplicationService;
}

export type GetApplicationService = (
  params: GetApplicationServiceParams
) => GetApplicationServiceRes;

export const getApplicationService: GetApplicationService = (params) => {
  const { applicationServiceId: paramsApplicationServiceId, serviceRecords } =
    params;

  let applicationServiceId = paramsApplicationServiceId;

  if (!applicationServiceId) {
    const findRes = serviceRecords.find((value) => {
      return value.type === "APPLICATION";
    });

    if (findRes) {
      applicationServiceId = findRes?.id;
    }
  }

  if (!applicationServiceId) {
    throw new Error("invalid application service id");
  }

  const { services } = instantiateServices(params);

  const applicationService = services.find((value) => {
    const res = value.id === applicationServiceId;

    return res;
  }) as ApplicationService | undefined;

  if (!applicationService) {
    throw new Error("invalid application service");
  }

  const res: GetApplicationServiceRes = {
    applicationService,
  };

  return res;
};
