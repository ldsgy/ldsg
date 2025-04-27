import {
  RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS as APPLICATION_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS,
  ApplicationResource,
} from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { instantiateResourcesRequiredByApp } from "@ldsg/resource-instantiator";
import { ResourceRecord } from "@ldsg/types";
import { Express } from "express";

interface CreateAppParams {
  resources?: Resource[];
  resourceRecords?: ResourceRecord[];
}

type CreateApp = (params: CreateAppParams) => Express;

export const createApp: CreateApp = (params) => {
  const { resources: paramsResources, resourceRecords } = params;

  let resources: Resource[];

  if (paramsResources) {
    resources = paramsResources;
  } else {
    if (!resourceRecords) {
      throw new Error("invalid manifest resources");
    }

    const resolveManifestResourcesRes = instantiateResourcesRequiredByApp({
      resourceRecords,
    });

    resources = resolveManifestResourcesRes.resources;
  }

  const applicationResource = resources.find(
    (value) =>
      value.kind ===
      APPLICATION_RESOURCE_DEFINITION_SPECIFIC_RESOURCE_SETTINGS.kind
  ) as ApplicationResource | undefined;

  if (!applicationResource) {
    throw new Error("invalid application resource");
  }

  const res = applicationResource.createExpressApp();

  return res;
};
