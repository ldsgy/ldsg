import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { ApplicationSpecificResourceSettings } from "./types";

type CreateExpressApp = () => Express;

interface ExtendExpressAppParams {
  app: Express;
}

export type ExtendExpressApp = (params: ExtendExpressAppParams) => void;

export class ApplicationResource extends Resource<ApplicationSpecificResourceSettings> {
  createExpressApp: CreateExpressApp = () => {
    const app = express();

    this.extendExpressApp({
      app,
    });

    return app;
  };

  extendExpressApp: ExtendExpressApp = (params) => {
    const { id, getFilteredResources } = this;

    const getFilteredResourcesRes = getFilteredResources<{
      extendExpressApp?: ExtendExpressApp;
    }>({
      parentId: id,
    });

    const { resources } = getFilteredResourcesRes;

    resources.forEach((resource) => {
      resource.extendExpressApp?.(params);
    });
  };
}
