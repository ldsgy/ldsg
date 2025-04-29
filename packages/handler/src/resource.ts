import {
  DefaultParams,
  DefaultRes,
  Handler,
  HandlerSpecificResourceSettings,
} from "@ldsg/handler-part";
import { Resource, ResourceConstructorParams } from "@ldsg/resource";

export interface HandlerResourceConstructorParams<
  T extends HandlerSpecificResourceSettings = HandlerSpecificResourceSettings
> extends ResourceConstructorParams<T> {
  handler?: Handler;
}

type GetHandler<
  Params extends DefaultParams = DefaultParams,
  Res extends DefaultRes = DefaultRes
> = () => Handler<Params, Res>;

export class HandlerResource<
  T extends HandlerSpecificResourceSettings = HandlerSpecificResourceSettings
> extends Resource<T> {
  /**
   * Handler
   */
  handler?: Handler;

  constructor(params: HandlerResourceConstructorParams<T>) {
    const { handler } = params;

    super(params);

    if (handler) {
      this.handler = handler;
    }
  }

  getModuleId = (): string => {
    const { id } = this;

    return id;
  };

  getHandler: GetHandler = () => {
    const { getModuleId, handler } = this;

    const moduleId = getModuleId();

    if (handler) {
      return handler;
    }

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
      throw new Error("require module failed");
    }
  };
}
