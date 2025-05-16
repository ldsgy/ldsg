import { SpecificResourceSettings } from "@ldsg/types";
import { ConnectOptions } from "mongoose";

export interface DatabaseSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Database URI
   */
  uri: string;

  /**
   * Connect Options
   */
  connectOptions?: ConnectOptions;
}
