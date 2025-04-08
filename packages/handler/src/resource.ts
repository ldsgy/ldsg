import { Resource } from "@ldsg/resource";
import { ResourceDefinitionSettings } from "@ldsg/resource-definition";
import {
  DefaultParams,
  DefaultRes,
  Handler,
  HandlerResourceSettings,
} from "./types";

type GetHandler<
  Params extends DefaultParams = DefaultParams,
  Res extends DefaultRes = DefaultRes
> = () => Handler<Params, Res>;

export class HandlerResource extends Resource<HandlerResourceSettings> {
  getModuleId = (): string => {
    const { code, dependencies } = this.getSettings();

    let res: string;

    if (code) {
      res = this.getId();
    } else if (dependencies[0]) {
      res = dependencies[0].name;
    } else {
      throw new Error("invalid handler settings");
    }

    return res;
  };

  getHandler: GetHandler = () => {
    const moduleId = this.getModuleId();

    try {
      const requireResult = require(moduleId);

      if ("handler" in requireResult) {
        return requireResult.handler;
      } else {
        throw new Error("invalid handler in module");
      }
    } catch (error) {
      throw new Error("require module failed");
    }
  };
}

export const resourceDefinitionSettings: ResourceDefinitionSettings = {
  title: "处理程序",
  description:
    "主要包含引入模块列表与相应的处理程序代码，处理程序类型资源无子级资源。",
  kind: "HANDLER",
  subResourceKinds: [],
};

/**
 * Handler Resource Settings
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
