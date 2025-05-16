import { SpecificResourceSettings } from "@ldsg/types";

export interface TableSpecificResourceSettings
  extends SpecificResourceSettings {
  /**
   * Table Name
   */
  name: string;

  /**
   * Object Resource Id
   */
  objectResourceId: string;

  /**
   * Database Resource Id
   */
  databaseResourceId?: string;
}
