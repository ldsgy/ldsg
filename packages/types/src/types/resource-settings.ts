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

export type SpecificResourceSettings = Record<string, any>;

export type ResourceSettings<
  T extends SpecificResourceSettings = SpecificResourceSettings
> = GeneralResourceSettings & Omit<T, keyof GeneralResourceSettings>;
