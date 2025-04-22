import { Resource } from "@ldsg/resource";
import {
  DefaultParams,
  DefaultRes,
  Handler,
  HandlerSpecificResourceSettings,
} from "./types";
type GetHandler<
  Params extends DefaultParams = DefaultParams,
  Res extends DefaultRes = DefaultRes
> = () => Handler<Params, Res>;

export class HandlerResource extends Resource<HandlerSpecificResourceSettings> {
  getModuleId = (): string => {
    const { id } = this;

    return id;
  };

  getHandler: GetHandler = () => {
    const moduleId = this.getModuleId();

    try {
      const requireRes = require(moduleId);

      if ("handler" in requireRes) {
        return requireRes.handler;
      } else {
        throw new Error("invalid handler in module");
      }
    } catch (error) {
      throw new Error("require module failed");
    }
  };
}
