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

    /**
     * Extra Key
     */
    [key: string]: any;
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
     * Connect uppercase letters with underscores
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
