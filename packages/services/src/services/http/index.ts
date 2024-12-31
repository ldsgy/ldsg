import { Service, SettingsSchema } from "@ldsg/core";
import { RequestHandler } from "express";
import { HTTP_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";

export * from "./constants";

export class HttpService extends Service {
  settingsSchema: SettingsSchema = HTTP_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  handleRequest: RequestHandler = async (req, res, next) => {
    const handler = this.getChildHandlerServiceHandler();

    if (handler) {
      handler(req, res, next);
    } else {
      res.send("Not Found");

      res.status(404);
    }
  };
}
