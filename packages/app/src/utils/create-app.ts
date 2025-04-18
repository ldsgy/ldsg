import {
  ApplicationResource,
  resourceDefinitionResourceSettings as applicationResourceDefinitionResourceSettings,
} from "@ldsg/application";
import { resolveManifestResources } from "@ldsg/manifest-resolver";
import { Resource, ResourceRecord } from "@ldsg/resource";
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

    const resolveManifestResourcesRes = resolveManifestResources({
      resourceRecords,
    });

    resources = resolveManifestResourcesRes.resources;
  }

  const applicationResource = resources.find(
    (value) => value.kind === applicationResourceDefinitionResourceSettings.kind
  ) as ApplicationResource | undefined;

  if (!applicationResource) {
    throw new Error("invalid application resource");
  }

  const res = applicationResource.createApp();

  return res;
};
