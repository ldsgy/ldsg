import {
  DefaultParams,
  DefaultRes,
  Handler,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler-part";
import { Resource } from "@ldsg/resource";

type GetHandler<
  Params extends DefaultParams = DefaultParams,
  Res extends DefaultRes = DefaultRes
> = () => Handler<Params, Res>;

export class HandlerResource extends Resource<HandlerSpecificResourceSettings> {
  /**
   * Handler
   */
  handler?: Handler;

  getModuleId = (): string => {
    const { id } = this;

    return id;
  };

  getHandler: GetHandler = () => {
    const { getModuleId, handler: thisHandler, settings } = this;

    const { handler: settingsHandler } = settings;

    if (thisHandler) {
      return thisHandler;
    }

    if (settingsHandler) {
      this.handler = settingsHandler;

      return settingsHandler;
    }

    const moduleId = getModuleId();

    try {
      const requireRes = require(moduleId);

      if ("handler" in requireRes) {
        const { handler } = requireRes;

        this.handler = handler;

        return handler;
      } else {
        throw new Error("invalid handler in module");
      }
    } catch (error) {
      console.error(error);
      throw new Error("require module failed");
    }
  };
}
