import { Service, SettingsSchema } from "@ldsg/core";
import { HANDLER_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";

export * from "./constants";

type Handler = (...rest: any[]) => any | Promise<any>;

type GetHandler = () => Handler;

export interface HandlerInfo {
  requireKey: string;
}

export class HandlerService extends Service {
  settingsSchema: SettingsSchema = HANDLER_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  getHandler: GetHandler = () => {
    const moduleId = this.getModuleId();

    try {
      const requireResult = require(moduleId);

      if ("handler" in requireResult) {
        return requireResult.handler;
      } else {
        throw new Error("invalid handler");
      }
    } catch (error) {
      console.error(error);

      throw new Error("invalid require");
    }
  };

  getModuleId = (): string => {
    const settings = this.getSettings();

    const { moduleId } = settings;

    const res: string = moduleId;

    return res;
  };
}
