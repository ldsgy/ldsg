import { Manifest } from "@ldsg/resource";
import { HandlerResource } from "./resource";
import { Handler, HandlerResourceSettings } from "./types";

export const handler: Handler<[Manifest.Resource<HandlerResourceSettings>]> = (
  params
) => {
  return new HandlerResource(params);
};
