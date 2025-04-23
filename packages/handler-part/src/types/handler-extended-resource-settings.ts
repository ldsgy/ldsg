import { SpecificResourceSettings } from "@ldsg/types";

interface HandlerExtendedResourceSettingsExtra {
  /**
   * Handler Resource ID
   */
  handlerResourceId: string;
}

export type HandlerExtendedResourceSettings<
  T extends SpecificResourceSettings = SpecificResourceSettings
> = T & HandlerExtendedResourceSettingsExtra;
