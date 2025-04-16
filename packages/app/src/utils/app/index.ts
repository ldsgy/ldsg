import {
  ApplicationResource,
  resourceDefinitionResourceSettings as applicationResourceDefinitionResourceSettings,
} from "@ldsg/application";
import { Resource } from "@ldsg/resource";
import { Express } from "express";

interface CreateAppParams {
  resources: Resource[];
}

type CreateApp = (params: CreateAppParams) => Express;

export const createApp: CreateApp = (params) => {
  const { resources } = params;

  const applicationResource = resources.find(
    (value) => value.kind === applicationResourceDefinitionResourceSettings.kind
  ) as ApplicationResource | undefined;

  if (!applicationResource) {
    throw new Error("invalid application resource");
  }

  const res = applicationResource.createApp();

  return res;
};
