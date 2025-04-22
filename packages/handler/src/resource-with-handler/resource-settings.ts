import { SpecificResourceSettings } from "@ldsg/types";

export type ResourceWithHandlerSpecificResourceSettings<
  T extends SpecificResourceSettings = SpecificResourceSettings
> = T & {
  /**
   * Handler Resource ID
   */
  handlerResourceId: string;
};
