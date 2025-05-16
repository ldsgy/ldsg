import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { DatabaseSpecificResourceSettings } from "./types";

type CreateExpressApp = () => Express;

interface ExtendExpressAppParams {
  app: Express;
}

export type ExtendExpressApp = (params: ExtendExpressAppParams) => void;

export class DatabaseResource extends Resource<DatabaseSpecificResourceSettings> {
  createExpressApp: CreateExpressApp = () => {
    const app = express();

    this.extendExpressApp({
      app,
    });

    return app;
  };

  extendExpressApp: ExtendExpressApp = (params) => {
    const { app } = params;

    const {
      id,
      settings: { name },
      getFilteredResources,
    } = this;

    app.get("/", (req, res) => {
      res.send(`Hello, ${name ?? "World"}!`);
    });

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
