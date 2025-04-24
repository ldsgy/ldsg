import { Resource } from "@ldsg/resource";
import express, { Express } from "express";
import { ApplicationSpecificResourceSettings } from "./types";

type CreateApp = () => Promise<Express>;

interface AddRoutesParams {
  app: Express;
}

type AddRoutes = (params: AddRoutesParams) => Promise<void>;

export class ApplicationResource extends Resource<ApplicationSpecificResourceSettings> {
  addRoutes: AddRoutes = async (params) => {
    const { app } = params;

    const {
      settings: { name },
      getFilteredResources,
    } = this;

    const getFilteredResourcesRes = getFilteredResources({});

    const { resources } = getFilteredResourcesRes;

    resources.forEach((resource) => {
      if ("addRoute" in resource && typeof resource.addRoute === "function") {
        resource?.addRoute();
      }
    });

    app.get("/", (req, res) => {
      res.send(`Hello, ${name ?? "World"}!`);
    });
  };

  createApp: CreateApp = async () => {
    const app = express();

    await this.addRoutes({
      app,
    });

    return app;
  };
}
