import { Handler, HandlerResourceSettings } from "@ldsg/handler";
import { Manifest, Resource } from "@ldsg/resource";
import { ResourceDefinitionSettings } from "@ldsg/resource-definition";
import { ApplicationResourceSettings } from "./types";

export class ApplicationResource extends Resource<ApplicationResourceSettings> {}

export const resourceDefinitionSettings: ResourceDefinitionSettings = {
  title: "应用",
  description: "",
  kind: "APPLICATION",
  subResourceKinds: [],
};

export const handler: Handler<
  [Manifest.Resource<ApplicationResourceSettings>]
> = (params) => {
  return new ApplicationResource(params);
};

/**
 * Current Kind Resource Handler Resource Settings
 * 此类型资源的子级处理程序资源的配置
 * 如无或为 undefined，则说明无需子级处理程序。
 */
export const handlerResourceSettings: HandlerResourceSettings = {
  title: "处理程序类型资源处理程序",
  description: "包含处理程序相应的模块，此模块主要通过",
  dependencies: [
    {
      name: "@ldsg/handler",
    },
  ],
};
