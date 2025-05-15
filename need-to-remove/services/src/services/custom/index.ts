import { Service, SettingsSchema } from "@ldsg/core";
import _ from "lodash";
import { CUSTOM_SERVICE_DEFAULT_SETTINGS_SCHEMA } from "./constants";

export * from "./constants";

export class CustomService extends Service {
  settingsSchema: SettingsSchema = CUSTOM_SERVICE_DEFAULT_SETTINGS_SCHEMA;

  getAlias = () => {
    const settings = this.getSettings();

    const alias = settings.alias;

    return alias;
  };

  getCamelCaseAlias = () => {
    const alias = this.getAlias();

    const camelCaseAlias = _.camelCase(alias);

    return camelCaseAlias;
  };

  appendToContext = (context: any) => {
    const camelCaseAlias = this.getCamelCaseAlias();

    const handler = this.getChildHandlerServiceHandler();

    context[camelCaseAlias] = async (params: any) => {
      if (!handler) {
        return;
      }

      return await handler(params, context);
    };
  };
}
