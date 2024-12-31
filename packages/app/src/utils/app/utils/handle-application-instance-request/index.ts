import { ApplicationInstance } from "@ldsg/services";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getPathInfo } from "./utils";

interface HandleApplicationInstanceRequestParams {
  applicationInstance: ApplicationInstance;
  basePath?: string;
  req: Request;
  res: Response;
  next: NextFunction;
}

export type HandleApplicationInstanceRequest = (
  params: HandleApplicationInstanceRequestParams
) => void;

export const handleApplicationInstanceRequest: HandleApplicationInstanceRequest =
  (params) => {
    const { applicationInstance, basePath = "/", req, res, next } = params;

    const getPathInfoRes = getPathInfo({
      basePath,
      path: req.path,
    });

    const { endpoint, relativePath } = getPathInfoRes;

    const { sofa, yoga, otherPathRequestHandler, context } =
      applicationInstance;

    res.locals.context = context;

    switch (endpoint) {
      case "api": {
        sofa(req, res, next);

        break;
      }

      case "graphql": {
        yoga(req, res, next);

        break;
      }

      case "http":
      default: {
        if (relativePath in otherPathRequestHandler) {
          const currentPathRequestHandler =
            otherPathRequestHandler[relativePath];

          asyncHandler(currentPathRequestHandler)(req, res, next);
        } else {
          res.status(404).send("Not Found Custom HTTP Path");
        }

        break;
      }
    }
  };
