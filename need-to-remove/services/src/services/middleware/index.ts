import { Service, SettingsSchema } from "@ldsg/core";
import { IMiddleware, IMiddlewareGenerator } from "graphql-middleware";
import { MIDDLEWARE_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";

export * from "./constants";

export class MiddlewareService extends Service {
  settingsSchema: SettingsSchema = MIDDLEWARE_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  getMiddleware = ():
    | IMiddleware<any, any, any>
    | IMiddlewareGenerator<any, any, any>
    | undefined => {
    const handler = this.getChildHandlerServiceHandler();

    if (!handler) {
      return;
    }

    return handler();
  };
}
