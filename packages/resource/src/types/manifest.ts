export namespace Manifest {
  /**
   * Resource Settings
   */
  export interface ResourceSettings {
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
   * Resource
   */
  export interface Resource<T extends ResourceSettings = ResourceSettings> {
    /**
     * Resource ID
     */
    id: string;

    /**
     * Resource Kind
     */
    kind: string;

    /**
     * Parent Resource ID
     */
    parentId: string;

    /**
     * Resource Settings
     */
    settings: T;
  }
}

/**
 * Manifest
 */
export interface Manifest {
  resources: Manifest.Resource[];
}
