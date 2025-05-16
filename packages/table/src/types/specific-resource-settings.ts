import { SpecificResourceSettings } from "@ldsg/types";

export interface TableSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Database Resource Id
   */
  databaseResourceId?: string;

  /**
   * Table Name
   */
  name: string;

  /**
   * Object Resource Id
   */
  objectResourceId: string;
}
