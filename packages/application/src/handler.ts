import { Handler } from "@ldsg/handler";
import { Manifest } from "@ldsg/resource";
import { ApplicationResource } from "./resource";
import { ApplicationResourceSettings } from "./types";

export const handler: Handler<
  [Manifest.Resource<ApplicationResourceSettings>]
> = (params) => {
  return new ApplicationResource(params);
};
