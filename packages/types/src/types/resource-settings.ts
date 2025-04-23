/**
 * General Resource Settings
 */
export interface GeneralResourceSettings {
  /**
   * Resource Title
   */
  title: string;

  /**
   * Resource Description
   */
  description: string;
}

/**
 * Specific Resource Settings
 */
export type SpecificResourceSettings = Record<string, any>;

/**
 * Resource Settings
 */
export type ResourceSettings<
  T extends SpecificResourceSettings = SpecificResourceSettings
> = GeneralResourceSettings & T;
