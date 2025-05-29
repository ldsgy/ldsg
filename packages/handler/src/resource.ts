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
   * Handler Without Changed This Pointer
   */
  handlerWithoutChangedThisPointer?: Handler;

  /**
   * Handler With Changed This Pointer
   */
  handlerWithChangedThisPointer?: Handler;

  getModuleId = (): string => {
    const { id } = this;

    return id;
  };

  getHandler: GetHandler = () => {
    const { getHandlerWithChangedThisPointer } = this;

    return getHandlerWithChangedThisPointer();
  };

  getHandlerWithChangedThisPointer: GetHandler = () => {
    const {
      handlerWithChangedThisPointer: thisHandlerWithChangedThisPointer,
      getHandlerWithoutChangedThisPointer,
    } = this;

    if (thisHandlerWithChangedThisPointer) {
      return thisHandlerWithChangedThisPointer;
    }

    const getHandlerWithoutChangedThisPointerRes =
      getHandlerWithoutChangedThisPointer();

    const handlerWithChangedThisPointer =
      getHandlerWithoutChangedThisPointerRes.bind(this);

    this.handlerWithChangedThisPointer = handlerWithChangedThisPointer;

    return handlerWithChangedThisPointer;
  };

  getHandlerWithoutChangedThisPointer: GetHandler = () => {
    const {
      getModuleId,
      handlerWithoutChangedThisPointer: thisHandlerWithoutChangedThisPointer,
      settings,
    } = this;

    const { handler: settingsHandler } = settings;

    if (thisHandlerWithoutChangedThisPointer) {
      return thisHandlerWithoutChangedThisPointer;
    }

    if (settingsHandler) {
      this.handlerWithoutChangedThisPointer = settingsHandler;

      return settingsHandler;
    }

    const moduleId = getModuleId();

    try {
      const requireRes = require(moduleId);

      if ("handler" in requireRes) {
        const { handler } = requireRes;

        this.handlerWithoutChangedThisPointer = handler;

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
