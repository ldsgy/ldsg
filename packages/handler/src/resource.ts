import { Resource } from "@ldsg/resource";
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
