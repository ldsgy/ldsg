import { GetApplicationInstanceParams } from "@ldsg/services";
import express, { Express } from "express";
import {
  GetApplicationServiceParams,
  getApplicationService,
  handleApplicationInstanceRequest,
} from "./utils";

export * from "./utils";

interface CreateAppParams
  extends GetApplicationServiceParams,
    GetApplicationInstanceParams {}

type CreateApp = (params: CreateAppParams) => Express;

export const createApp: CreateApp = (params) => {
  const { basePath, yogaServerOptions } = params;

  const app = express();

  const { applicationService } = getApplicationService(params);

  const applicationInstance = applicationService.getApplicationInstance({
    basePath,
    yogaServerOptions,
  });

  app.use((req, res, next) => {
    handleApplicationInstanceRequest({
      applicationInstance,
      basePath,
      req,
      res,
      next,
    });
  });

  return app;
};
