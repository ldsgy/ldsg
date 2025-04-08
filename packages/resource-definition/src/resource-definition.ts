import { Manifest } from "@ldsg/resource";

class ResourceDefinition<
  T extends Manifest.ResourceSettings = Manifest.ResourceSettings
> extends Resource {
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

  constructor(resource: Manifest.Resource<T>) {
    const { id, kind, parentId, settings } = resource;

    this.id = id;
    this.kind = kind;
    this.parentId = parentId;
    this.settings = settings;
  }

  getId = () => {
    const id = this.id;

    if (!id) {
      throw new Error("resource id is required");
    }

    return id;
  };

  getKind = () => {
    const type = this.kind;

    if (!type) {
      throw new Error("resource kind is required");
    }

    return type;
  };

  getParentId = () => {
    const parentId = this.parentId;

    if (!parentId) {
      throw new Error("resource parent id is required");
    }

    return parentId;
  };

  /**
   * Get Resource Settings
   * @returns Resource Settings
   */
  getSettings = () => {
    const settings = this.settings ?? {};

    return settings;
  };
}
